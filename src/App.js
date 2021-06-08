
import Inicio from './Inicio'
import Cadastro from './Cadastro'
import Login from './Login'
import Gastos from './Gastos'
import Exemplo from './Exemplo'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


export default function App() {

  return <div className="App">

    <Router>
      <Switch>

        <Route path="/cadastro"><Cadastro/></Route>
        <Route path="/gastos"><Gastos/></Route>
        <Route path="/login"><Login/></Route>

        <Route path="/"><Inicio/></Route>
        {/* O path="/" tem que ficar no final pra não dar erro */}
      </Switch>
    </Router>

  </div>
}

