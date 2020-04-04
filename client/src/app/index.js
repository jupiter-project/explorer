import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar, FooterNavArea } from '../components'
import { BlockList, TxList, Block, Account, Peers, Generators } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={BlockList} />
                <Route path="/api/tx/:id" exact component={TxList} />
                <Route path="/api/peers" exact component={Peers} />
                <Route path="/txs" exact component={TxList} />
                <Route path="/api/account/:id" exact component={Account} />
                <Route path="/api/block/:id" exact component={Block} />
                <Route path="/api/generators" exact component={Generators} />
            </Switch>
            <FooterNavArea />
        </Router>
    )
}

export default App
