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

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountFind: '',
            account: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        const { pathname } = this.props.location;
        const accountFind = pathname.replace('/api/account/', '');
        this.setState({
            accountFind,
        });
        this.setState({ isLoading: true })

        await api.getAccount(accountFind).then(account => {
            this.setState({
                account: [account.data.data],
                isLoading: false,
            })
        })
    }

    render() {
        const { account, isLoading } = this.state

        const columns = [
            {
                Header: 'Account',
                accessor: 'accountRS',
                width: '50%',
            },
            {
                Header: 'Balance',
                accessor: 'balanceNQT',
                width: '50%',
                Cell: function(props) {
                    return (
                        <span>
                            {props.original.balanceNQT/100000000 || 0} JUP
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!account.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={account}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}

{/* For future Account Transactions
                {showTable && (
                    <ReactTable
                        data={account}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )} */}
            </Wrapper>
        )
    }
}

export default Account
