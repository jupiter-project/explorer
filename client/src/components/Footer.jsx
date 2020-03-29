import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    bottom: 0;
    text-align: center;
    font-size: 12px;
`

class FooterNavArea extends Component {
    render() {
        return (
            <div className="fixed-bottom">
            <Wrapper>
                <span>version 0.3 Made with 🧡 by Sigwo Technologies ©️ 2020</span>
            </Wrapper>
            </div>
        )
    }
}

export default FooterNavArea
