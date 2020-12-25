import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const ProfitDisplay = props => {

	return (
		<OverlayTrigger
			trigger="hover"
			placement="bottom"
			overlay={
				<Popover>
					<Popover.Title as="h3">{props.title}</Popover.Title>
					<Popover.Content>
						{props.content}
					</Popover.Content>
				</Popover>
			}
		>
			<button type="button" class="btn btn-dark">{props.value}</button>
		</OverlayTrigger>
	)
}

export default ProfitDisplay
