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
                <span>version 0.6 Made with <span role="img" aria-labelledby="orangeHeart">🧡</span> 
                by the Jupiter Project <span role="img" aria-labelledby="copyright">©️</span> 2021</span>
            </Wrapper>
            </div>
        )
    }
}

export default FooterNavArea
