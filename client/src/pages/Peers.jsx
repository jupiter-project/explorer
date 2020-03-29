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
            peerData: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getPeers().then(peerData => {
            this.setState({
                peerData: peerData.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { peerData, isLoading } = this.state
        console.log('TCL: Peer -> render -> peer', peerData)

        const columns = [
            {
                Header: 'Peer Address',
                accessor: 'address',
                width: 200,
            },
            {
                Header: 'Application',
                accessor: 'application',
                width: 200,
            },
            {
                Header: 'Version',
                accessor: 'version',
                width: 200,
            },
            {
                Header: 'Services',
                accessor: 'services',
                width: 200,
            },
            {
                Header: 'Platform',
                accessor: 'platform',
                width: 200,
            },
        ]

        let showTable = true
        if (!peerData.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={peerData}
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
