import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://gojupiter.tech">
                <img src={logo} width="50" height="50" alt="gojupiter.tech" />
            </Wrapper>
        )
    }
}

export default Logo
