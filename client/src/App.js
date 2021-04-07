import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

import './styles/App.css'

function App() {
	return (
		<>
		{console.log('starting router')}
		<Router>
			{console.log('starting swich')}
			<Switch>
				{console.log('checking /admin')}
				<Route path='/admin' render={_ => {
					console.log('going to admin');
					return <Admin/>
				}} />
				{console.log('not /admin')}
				<Route render={_ => <Router>
					<Switch>
						{console.log('checking /')}
						<Route exact path='/' component={Home} />
					</Switch>
				</Router>} />
			</Switch>
		</Router>
		</>
	)
}

export default App
