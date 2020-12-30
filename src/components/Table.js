import Card from './Card'

const Table = props => {

	return (
		<>
			<div className='row'>
				<div className="col text-center">
					{ props.dealer.cards.map((card, i) => {
						return <Card key={i} number={card.number} suit={card.suit}/>;
					}) }
					<p>Dealer's Hand ({ props.dealer.count })</p>
				</div>
			</div>

			<div className='row'>
				<div className='col text-center'>
					{ props.message }
				</div>
			</div>

			<div className='row'>
				<div className='col text-center'>
					<p>Your Hand ({ props.player.count })</p>
					{ props.player.cards.map((card, i) => {
						return <Card key={i} number={card.number} suit={card.suit}/>
					}) }
				</div>
			</div>
		</>
	)
}

export default Table
