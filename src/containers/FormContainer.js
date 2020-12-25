import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PlayerNameForm from '../forms/PlayerNameForm'

class FormContainer extends Component {

	render() {
		return (
			<Row className='d-flex align-items-center customHeight'>
				<Col className='text-center'>
					<PlayerNameForm />
				</Col>
			</Row>			
		)
	}
}

export default FormContainer
