import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    text-align: center;
`

class TxList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transaction: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        const { pathname } = this.props.location;
        const transaction = pathname.replace('/api/tx/', '');
        this.setState({
            transaction,
        });

        this.setState({ isLoading: true })

        await api.getTxs(transaction).then(txs => {
            this.setState({
                txs: txs.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { txs, isLoading } = this.state
        console.log('TCL: TxList -> render -> txs', txs)

        const columns = [
            {
                Header: 'Block Height',
                accessor: 'height',
            },
            {
                Header: 'Sender',
                accessor: 'senderRS',
            },
            {
                Header: 'Recipient',
                accessor: 'recipientRS',
            },
            {
                Header: 'Message',
                accessor: 'attachment.message',
            },
            {
                Header: 'Fees',
                accessor: 'feeNQT',
            },
            {
                Header: 'Amount',
                accessor: 'amountNQT',
            },
        ]

        let showTable = true
        if (!txs.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={txs}
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
