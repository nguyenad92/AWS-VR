import './CSS/Upload.css';
import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator, S3Image } from 'aws-amplify-react';
import { v4 as uuid } from 'uuid';
import { Divider, Form, Grid, Header, Input, List, Segment } from 'semantic-ui-react';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);

class Uploadpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { uploading: false };
	}
	onChange = async (e) => {
		const file = e.target.files[0];
		const fileName = uuid();
		this.setState({ uploading: true });
		const result = await Storage.put(fileName, file, {
			customPrefix: { public: 'uploads/' }
		});
		console.log('Uploaded file: ', result);
		this.setState({ uploading: false });
	};

	render() {
		return (
			<div className="main_upload">
				<React.Fragment>
					<CssBaseline />
					<Container fixed>
						<Typography component="div" style={{ backgroundColor: 'white', height: '60vh' }} id="container">
							{/* <IconButton aria-label="show 4 new mails" color="inherit" id="icon" size="medium">
                <MailIcon />
            </IconButton> */}
							<a>
								<img id="upload_img" src={require('../../images/upload.png')} />
							</a>
							<label id="upload_desc">Select files to upload</label>
							<Form.Button
								onClick={() => document.getElementById('add-image-file-input').click()}
								disabled={this.state.uploading}
								icon="file image outline"
								content={this.state.uploading ? 'Uploading...' : 'Add Image'}
							/>
							<input
								id="add-image-file-input"
								type="file"
								accept="image/*"
								onChange={this.onChange}
								style={{ display: 'none' }}
							/>
						</Typography>
					</Container>
				</React.Fragment>
			</div>
		);
	}
}

export default Uploadpage;
