
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Jupiter Explorer v0.3
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/api/blocks" className="nav-link">
                                Blocks
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/api/block" className="nav-link">
                                Block
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/api/txs" className="nav-link">
                                Transactions
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
