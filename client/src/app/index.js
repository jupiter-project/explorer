import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { BlockList } from '../pages'
import TxList from '../pages/TxList.jsx'
import Block from '../pages/Block.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={BlockList} />
                <Route path="/api/txs" exact component={TxList} />
                <Route path="/api/block/:id" exact component={Block} />
            </Switch>
        </Router>
    )
}

export default App
