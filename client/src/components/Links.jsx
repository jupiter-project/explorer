
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
                    Jupiter Explorer
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/" className="nav-link">
                                Latest Blocks
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/api/generators" className="nav-link">
                                Generators
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/api/peers" className="nav-link">
                                Peers
                            </Link>
                        </Item>
                        <Item>
                            <a href="https://metis.gojupiter.tech" className="nav-link">
                                Metis
                            </a>
                        </Item>
                        <Item>
                            <a href="https://nomics.com/assets/jup-jupiter" className="nav-link">
                                Nomics Data
                            </a>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
