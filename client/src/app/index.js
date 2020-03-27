import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { BlockList, TxList, Block, Account } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={BlockList} />
                <Route path="/txs" exact component={TxList} />
                <Route path="/account" exact component={Account} />
                <Route path="/block/:id" exact component={Block} />
            </Switch>
        </Router>
    )
}

export default App
