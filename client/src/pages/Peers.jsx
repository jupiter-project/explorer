import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 2% 20% 10% 20%;
    text-align: center;
    font-size: 12px;
`

class Peer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peer: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getPeers().then(peer => {
            this.setState({
                peer: peer.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { peer, isLoading } = this.state
        console.log('TCL: Peer -> render -> peer', peer)

        const columns = [
            {
                Header: 'Peer Address',
                accessor: 'peers',
                width: 200,
                Cell: function(props) {
                    return (
                        <span>
                            {props.value.join(', ') || 'None'}
                        </span>
                    )
                },
                style: { 'whiteSpace': 'unset' }
            },
        ]

        let showTable = true
        if (!peer.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={peer}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default Peer
