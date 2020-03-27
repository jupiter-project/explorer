import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    text-align: center;
    font-size: 12px;
`

class Block extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: '',
            block: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        const { pathname } = this.props.location;
        const height = pathname.replace('/api/block/', '');
        this.setState({
            height,
        });
        this.setState({ isLoading: true })

        await api.getBlock(height).then(block => {
            this.setState({
                block: [block.data.data],
                isLoading: false,
            })
        })
    }

    render() {
        const { block, isLoading } = this.state
        console.log('TCL: Block -> render -> block', block)

        const columns = [
            {
                Header: 'Block Height',
                accessor: 'height',
            },
            {
                Header: 'Age',
                accessor: 'timestamp',
            },
            {
                Header: 'Fee Reward',
                accessor: 'totalFeeNQT',
            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
            },
            {
                Header: 'Transactions',
                accessor: 'transactions',
                Cell: props => <span>{props.value.join(', ')}</span>,
                style: { 'whiteSpace': 'unset' }
            },
            {
                Header: 'Generator',
                accessor: 'generatorRS',
            },
            {
                Header: 'Payload Hash',
                accessor: 'block',
            },
        ]

        let showTable = true
        if (!block.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={block}
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

export default Block
