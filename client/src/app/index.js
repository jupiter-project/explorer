import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { BlockList, BlockInsert, BlockUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/block/list" exact component={BlockList} />
                <Route path="/block/create" exact component={BlockInsert} />
                <Route
                    path="/block/update/:id"
                    exact
                    component={BlockUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
