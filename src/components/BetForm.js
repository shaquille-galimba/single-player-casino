
const BetForm = props => {

	return(
		<>
			<div className="input-bet">
				<form onSubmit={(e) => {props.placeBet(e)}}>
					<input className="field" type="number" name="bet" placeholder="" autoComplete="off" step={50} value={props.inputValue} onChange={props.inputChange.bind(this)}/>
					<input type="submit" className="btn btn-primary btn-sm" value="Place Bet"/>
				</form>
			</div>
			<button className="btn btn-dark btn-sm" onClick={() => {props.handleCheckout()}}>Checkout</button>
		</>
	)
}

export default BetForm
