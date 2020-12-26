import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const ProfitDisplay = props => {

	return (
		<OverlayTrigger
			placement="bottom"
			overlay={
				<Popover>
					<Popover.Title as="h3">{props.title} profit</Popover.Title>
					<Popover.Content>
						{props.title} has a total earnings of <strong>{props.content}$</strong>
					</Popover.Content>
				</Popover>
			}
		>
			<button type="button" className="btn btn-dark">{props.value} profit</button>
		</OverlayTrigger>
	)
}

export default ProfitDisplay
