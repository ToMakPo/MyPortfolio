import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './data/Admin'

import './styles/App.css'

function App() {
	return (
		<>
		<Router>
			<Switch>
				<Route path='/admin' component={Admin} />
				<Route render={_ => <Router>
					<Switch>
						<Route exact path='/' component={Home} />
					</Switch>
				</Router>} />
			</Switch>
		</Router>
		</>
	)
}

export default App
