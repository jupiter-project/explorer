import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'
import Moment from 'moment';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
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
                Header: 'Date/Time Forged',
                accessor: 'timestamp',
                Cell: function(props) {
                    return (
                        <span>
                            {Moment.unix(props.original.timestamp + 1508609968).utcOffset('+0500').format('dddd, MMMM Do, YYYY h:mm:ss UTC')}
                        </span>
                    )
                },
                filterable: false,
            },
            {
                Header: 'Fees',
                accessor: 'totalFeeNQT',
                Cell: function(props) {
                    return (
                        <span>
                            {props.original.totalFeeNQT/100000000 || 0} JUP
                        </span>
                    )
                },
                filterable: false,
            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
                Cell: function(props) {
                    return (
                        <span>
                            {props.original.amountNQT/100000000 || 0} JUP
                        </span>
                    )
                },
                filterable: false,
            },
            {
                Header: '# of Transactions',
                accessor: 'transactions.length',
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
                filterable: true,
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
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}                 
                    />
                )}
            </Wrapper>
        )
    }
}

export default BlockList
