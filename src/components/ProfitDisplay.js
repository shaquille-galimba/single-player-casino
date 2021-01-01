import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const ProfitDisplay = props => {

	return (
		<OverlayTrigger
			placement="bottom"
			overlay={
				<Popover>
					<Popover.Content>
						{props.title} has a total earnings of <strong>{props.content}$</strong>
					</Popover.Content>
				</Popover>
			}
		>
			<button type="button" className="btn btn-dark">{props.value}'s profit</button>
		</OverlayTrigger>
	)
}

export default ProfitDisplay
