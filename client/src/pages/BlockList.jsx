import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class BlockList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getBlocks().then(blocks => {
            this.setState({
                blocks: blocks.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { blocks, isLoading } = this.state
        console.log('TCL: BlockList -> render -> blocks', blocks)

        const columns = [
            {
                Header: 'Block Height',
                accessor: 'height',
                filterable: true,
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/block/${props.original.height}`}>{props.original.height}</Link>
                        </span>
                    )
                },
            },
            {
                Header: 'Age',
                accessor: 'timestamp',
                filterable: false,
            },
            {
                Header: 'Fees',
                accessor: 'totalFeeNQT',
                filterable: false,
            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
                filterable: false,
            },
            {
                Header: 'Transactions',
                accessor: 'transactions.length',
                filterable: false,
            },
            {
                Header: 'Forger',
                accessor: 'generatorRS',
                filterable: true,
            },
        ]
        let showTable = true
        if (!blocks.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={blocks}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={25}
                        showPageSizeOptions={true}
                        minRows={0}                 
                    />
                )}
            </Wrapper>
        )
    }
}

export default BlockList
