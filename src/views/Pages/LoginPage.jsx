import React from 'react';
import PropTypes from 'prop-types';
import { login } from '../../components/firebase/firebaseAuth.js';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

import loginPageStyle from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx';

Amplify.configure(awsconfig);

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		// we use this to make the card to appear after the page has been rendered
		this.state = {
			cardAnimaton: 'cardHidden',

			password: '',
			username: ''
		};
	}
	componentDidMount() {
		// we add a hidden class to the card and after 700 ms we delete it and the transition appears
		this.timeOutFunction = setTimeout(
			function() {
				this.setState({ cardAnimaton: '' });
			}.bind(this),
			700
		);
	}
	componentWillUnmount() {
		clearTimeout(this.timeOutFunction);
		this.timeOutFunction = null;
	}

	handleLogin = () => {
		login(this.state.username, this.state.password)
			.then(() => {
				// Handle successful login here
				this.redirectToHomepage();
			})
			.catch((error) => {
				// Handle failed login here
			});
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await Auth.signIn(this.state.username, this.state.password);
			this.redirectToHomepage();
		} catch (error) {
			// Handle failed login here
		}
	};

	redirectToHomepage = () => {
		this.props.history.push(`/admin/homepage`);
	};

	updateUsername = (e) => {
		this.state.username = e.target.value;
	};
	// updateEmail = (e) => {
	// 	this.state.email = e.target.value;
	// };

	updatePassword = (e) => {
		this.state.password = e.target.value;
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<GridContainer justify="center">
					<GridItem xs={12} sm={6} md={4}>
						<form>
							<Card login className={classes[this.state.cardAnimaton]}>
								<CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="rose">
									<h4 className={classes.cardTitle}>Log in</h4>
									<div className={classes.socialLine}>
										{[
											'fab fa-facebook-square',
											'fab fa-twitter',
											'fab fa-google-plus'
										].map((prop, key) => {
											return (
												<Button
													color="transparent"
													justIcon
													key={key}
													className={classes.customButtonClass}
												>
													<i className={prop} />
												</Button>
											);
										})}
									</div>
								</CardHeader>
								<CardBody>
									<TextField
										id="standard-email-input"
										label="Username"
										onChange={this.updateUsername}
										className={classes.textField}
										fullWidth
										type="email"
										name="email"
										autoComplete="email"
										margin="normal"
									/>

									<TextField
										id="standard-password-input"
										label="Password"
										onChange={this.updatePassword}
										className={classes.textField}
										fullWidth
										type="password"
										autoComplete="current-password"
										margin="normal"
									/>
								</CardBody>
								<CardFooter className={classes.justifyContentCenter}>
									<Button onClick={this.handleSubmit} color="rose" simple size="lg" block>
										Let{"'"}s Dive
									</Button>
								</CardFooter>
							</Card>
						</form>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
