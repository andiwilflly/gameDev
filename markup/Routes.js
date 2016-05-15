import { Router, Route, IndexRoute } from 'react-router';
import Layout from 'Layout.js';
import HomePage from 'components/pages/HomePage.js';



export default class Routes extends React.Component {

	render() {
		return (
			<Router history={ this.props.history }>

				<Route path="/" component={HomePage}/>

				<Route path="/:lang" component={Layout}>
					<IndexRoute component={HomePage}/>
					
					<Route path="*" component={HomePage}/>
				</Route>
			</Router>
		);
	}
}