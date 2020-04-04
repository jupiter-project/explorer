import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 2% 20% 10% 20%;
    text-align: center;
    font-size: 12px;
`

class TxList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transactionFind: '',
            trxs: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        const { pathname } = this.props.location;
        const transactionFind = pathname.replace('/api/tx/', '');
        this.setState({
            transactionFind,
        });

        this.setState({ isLoading: true })

        await api.getTx(transactionFind).then(trxs => {
            this.setState({
                trxs: [trxs.data.data],
                isLoading: false,
            })
        })
    }

    render() {
        const { trxs, isLoading } = this.state

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
                Header: 'Sender',
                accessor: 'senderRS',
                width: 200,
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/account/${props.original.senderRS}`}>{props.original.senderRS}</Link>
                        </span>
                    )
                },
            },
            {
                Header: 'Recipient',
                accessor: 'recipientRS',
                width: 200,
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/account/${props.original.recipientRS}`}>{props.original.recipientRS}</Link>
                        </span>
                    )
                },
            },
            {
                Header: 'Message',
                accessor: 'attachment.message',
                width: 300,
                style: { 'whiteSpace': 'unset' },
            },
            {
                Header: 'Fees',
                accessor: 'feeNQT',
                width: 125,
                Cell: function(props) {
                    return (
                        <span>
                            {Number(props.original.feeNQT/100000000).toFixed(8) || 0} JUP
                        </span>
                    )
                },

            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
                Cell: function(props) {
                    return (
                        <span>
                            {Number(props.original.amountNQT/100000000).toFixed(8) || 0} JUP
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!trxs.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={trxs}
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

export default TxList
