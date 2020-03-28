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
                <Route path="/tx/:id" exact component={TxList} />
                <Route path="/account/:id" exact component={Account} />
                <Route path="/api/block/:id" exact component={Block} />
            </Switch>
        </Router>
    )
}

export default App
