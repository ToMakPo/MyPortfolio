import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

import './styles/App.css'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route exact path='/admin' component={Admin}/>
			</Switch>
		</Router>
	)
}

export default App
