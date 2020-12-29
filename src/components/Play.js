import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updatePlayerScore } from '../actions/playerActions'

class Play extends Component {

	constructor(props) {
    super(props);

    this.state = {
      deck: [],
      dealer: null,
      player: null,
      wallet: 0,
      inputValue: '',
      currentBet: null,
      gameOver: false,
      message: null,
			checkedOut: false
    };
  }

  generateDeck = () => {
    const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    const suits = ['♦','♣','♥','♠'];
    const deck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({number: cards[i], suit: suits[j]});
      }
    }
    return deck;
  }

  dealCards = (deck) =>  {
    const playerCard1 = this.getRandomCard(deck);
    const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck);
    const playerCard2 = this.getRandomCard(dealerCard1.updatedDeck);
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
    const dealerStartingHand = [dealerCard1.randomCard, {}];

    const player = {
      cards: playerStartingHand,
      count: this.getCount(playerStartingHand)
    };
    const dealer = {
      cards: dealerStartingHand,
      count: this.getCount(dealerStartingHand)
    };

    return {updatedDeck: playerCard2.updatedDeck, player, dealer};
  }

  startNewGame = (type) =>  {
    if (type === 'continue') {
      if (this.state.wallet > 0) {
        const deck = (this.state.deck.length < 10) ? this.generateDeck() : this.state.deck;
        const { updatedDeck, player, dealer } = this.dealCards(deck);

        this.setState({
          deck: updatedDeck,
          dealer,
          player,
          currentBet: null,
          gameOver: false,
          message: null
        });
      } else {
        this.setState({ message: 'Game over! You are broke! Please checkout.' });
      }
    } else {
      const deck = this.generateDeck();
      const { updatedDeck, player, dealer } = this.dealCards(deck);

      this.setState({
        deck: updatedDeck,
        dealer,
        player,
        wallet: 1000,
        inputValue: '',
        currentBet: null,
        gameOver: false,
        message: null
      });
    }
  }

  getRandomCard = (deck) =>  {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  }

  placeBet = (e) => {
		e.preventDefault()
    const currentBet = this.state.inputValue;

    if (currentBet > this.state.wallet) {
      this.setState({ message: 'Insufficient funds to bet that amount.' });
    } else if (currentBet % 1 !== 0) {
      this.setState({ message: 'Please bet whole numbers only.' });
    } else {
      // Deduct current bet from wallet
      const wallet = this.state.wallet - currentBet;
      this.setState({ wallet, inputValue: '', currentBet });
    }
  }

  hit = () =>  {
    if (!this.state.gameOver) {
      if (this.state.currentBet) {
        const { randomCard, updatedDeck } = this.getRandomCard(this.state.deck);
        const player = this.state.player;
        player.cards.push(randomCard);
        player.count = this.getCount(player.cards);

        if (player.count > 21) {
          this.setState({ player, gameOver: true, message: 'BUST!' });
        } else {
          this.setState({ deck: updatedDeck, player });
        }
      } else {
        this.setState({ message: 'Please place bet.' });
      }
    } else {
      this.setState({ message: 'Game over! Please checkout.' });
    }
  }

  dealerDraw = (dealer, deck) =>  {
    const { randomCard, updatedDeck } = this.getRandomCard(deck);
    dealer.cards.push(randomCard);
    dealer.count = this.getCount(dealer.cards);
    return { dealer, updatedDeck };
  }

  getCount = (cards) =>  {
    const rearranged = [];
    cards.forEach(card => {
      if (card.number === 'A') {
        rearranged.push(card);
      } else if (card.number) {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total, card) => {
      if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
        return total + 10;
      } else if (card.number === 'A') {
        return (total + 11 <= 21) ? total + 11 : total + 1;
      } else {
        return total + card.number;
      }
    }, 0);
  }

  stand = () =>  {
    if (!this.state.gameOver) {
      const randomCard = this.getRandomCard(this.state.deck);
      let deck = randomCard.updatedDeck;
      let dealer = this.state.dealer;
      dealer.cards.pop();
      dealer.cards.push(randomCard.randomCard);
      dealer.count = this.getCount(dealer.cards);
      while(dealer.count < 17) {
        const draw = this.dealerDraw(dealer, deck);
        dealer = draw.dealer;
        deck = draw.updatedDeck;
      }

      if (dealer.count > 21) {
        this.setState({
          deck,
          dealer,
          wallet: this.state.wallet + this.state.currentBet * 2,
          gameOver: true,
          message: 'Dealer bust! You win!'
        });
      } else {
        const winner = this.getWinner(dealer, this.state.player);
        let wallet = this.state.wallet;
        let message;

        if (winner === 'dealer') {
          message = 'Dealer wins...';
        } else if (winner === 'player') {
          wallet += this.state.currentBet * 2;
          message = 'You win!';
        } else {
          wallet += this.state.currentBet;
          message = 'Push.';
        }

        this.setState({
          deck,
          dealer,
          wallet,
          gameOver: true,
          message
        });
      }
    } else {
      this.setState({ message: 'Game over! Please checkout.' });
    }
  }

  getWinner = (dealer, player) =>  {
    if (dealer.count > player.count) {
      return 'dealer';
    } else if (dealer.count < player.count) {
      return 'player';
    } else {
      return 'push';
    }
  }

  inputChange = (e) => {
    const inputValue = +e.target.value;
    this.setState({inputValue});
  }

	handleCheckout = () => {
		this.setState({ checkedOut: true })
	}

  componentDidMount() {
    this.startNewGame();

		window.onbeforeunload = function() {
			 this.onUnload();
			 return "";
	 }.bind(this);
  }

	onUnload = () => {
	  this.props.updatePlayerScore(this.props.current_player.id, this.state.wallet)
	}

	componentWillUnmount() {
		this.props.updatePlayerScore(this.props.current_player.id, this.state.wallet)
	}

	handleEmptyCurrentPlayer = () => {

		if (Object.keys(this.props.current_player).length === 0) {
			return (
				<div className='row d-flex align-items-center'>
					<div className='col text-center'>
						Please press New Game to play
					</div>
				</div>)
		} else {

			return (
				<>
					{
						this.state.currentBet ?
							<>
								<div className='row'>
									<div className='col text-center'>
										<table className="cards">
											<tbody>
												<tr>
													{ this.state.dealer.cards.map((card, i) => {
														return <Card key={i} number={card.number} suit={card.suit}/>;
													}) }
												</tr>
											</tbody>
										</table>
										<p>Dealer's Hand ({ this.state.dealer.count })</p>
									</div>
								</div>

								<div className='row'>
									<div className='col text-center'>
										{ this.state.message }
									</div>
								</div>

								<div className='row'>
									<div className='col text-center'>
										<p>Your Hand ({ this.state.player.count })</p>
										<table className="cards">
											<tbody>
												<tr>
													{ this.state.player.cards.map((card, i) => {
														return <Card key={i} number={card.number} suit={card.suit}/>
													}) }
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</>
						: null
					}

					<div className='row'>
						<div className='col text-center'>
							<p>Wallet: ${ this.state.wallet }</p>
							{
								!this.state.currentBet ?
									<>
										<div className="input-bet">
											<form onSubmit={(e) => {this.placeBet(e)}}>
												<input className="field" type="number" name="bet" placeholder="" autoComplete="off" step={50} value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
												<input type="submit" className="btn btn-primary btn-sm" value="Place Bet"/>
											</form>
										</div>
										<button className="btn btn-dark btn-sm" onClick={() => {this.handleCheckout()}}>Checkout</button>
									</>
								: null
							}
							{
								this.state.gameOver ?
									<div className="buttons">
										<button className="btn btn-primary btn-sm" onClick={() => {this.startNewGame('continue')}}>Continue</button>
										<button className="btn btn-dark btn-sm" onClick={() => {this.handleCheckout()}}>Checkout</button>
									</div>
								: null
							}
						</div>
					</div>

					<div className='row'>
						{
							this.state.currentBet ?
								<>
									<div className='col text-center'>
										<p>Current Bet: ${this.state.currentBet}</p>
										<button className="btn btn-danger" onClick={() => {this.hit()}}>Hit</button>
										<button className="btn btn-light" onClick={() => {this.stand()}}>Stand</button>
										<button className="btn btn-danger">x2</button>

									</div>
								</>
							: null
						}
					</div>
					{this.state.checkedOut && <Redirect to="/blackjack/result" />}
				</>
			)
		}
	}



  render() {


    return (
			<div>
				{this.handleEmptyCurrentPlayer()}
			</div>
    );
  }
};

const Card = ({ number, suit }) => {
  const combo = (number) ? `${number}${suit}` : null;
  const color = (suit === '♦' || suit === '♥') ? 'card-red' : 'card';

  return (
    <td>
      <div className={color}>
        { combo }
      </div>
    </td>
  );
}

const mapDispatchToProps = dispatch => {
	return {
		updatePlayerScore: (player_id, latest_score) => dispatch(updatePlayerScore(player_id, latest_score))
	}
}

export default connect(null, mapDispatchToProps)(Play)
