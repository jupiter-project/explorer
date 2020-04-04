import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'
import Moment from 'moment';

const Wrapper = styled.div`
    padding: 2% 20% 0% 20%;
    text-align: center;
    font-size: 12px;
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

        const columns = [
            {
                Header: 'Block Height',
                accessor: 'height',
                width: 90,
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/block/${props.original.height}`}>{props.original.height}</Link>
                        </span>
                    )
                },
            },
            {
                Header: 'Date/Time Forged',
                accessor: 'timestamp',
                width: 275,
                Cell: function(props) {
                    return (
                        <span>
                            {Moment.unix(props.original.timestamp + 1508609968).utcOffset('+0500').format('dddd, MMMM Do, YYYY h:mm:ss UTC')}
                        </span>
                    )
                },
            },
            {
                Header: 'Fees',
                accessor: 'totalFeeNQT',
                width: 125,
                Cell: function(props) {
                    return (
                        <span>
                            {Number(props.original.totalFeeNQT/100000000).toFixed(8) || 0} JUP
                        </span>
                    )
                },
            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
                width: 125,
                Cell: function(props) {
                    return (
                        <span>
                            {Number(props.original.totalAmountNQT/100000000).toFixed(8) || 0} JUP
                        </span>
                    )
                },
                filterable: false,
            },
            {
                Header: '# of Txs',
                accessor: 'transactions.length',
                width: 75,
                filterable: false,
            },
            {
                Header: 'Forger',
                accessor: 'generatorRS',
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/account/${props.original.generatorRS}`}>{props.original.generatorRS}</Link>
                        </span>
                    )
                },
                filterable: false,
            }
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
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}                 
                    />
                )}
            </Wrapper>
        )
    }
}

export default BlockList
