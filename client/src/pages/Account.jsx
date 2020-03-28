import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    text-align: center;
`

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        const { pathname } = this.props.location;
        const account = pathname.replace('/api/account/', '');
console.log(account)
        this.setState({
            account,
        });
        this.setState({ isLoading: true })

        await api.getAccount(account).then(account => {
            this.setState({
                generatorRS: [account.data.data],
                isLoading: false,
            })
        })
    }

    render() {
        const { account, isLoading } = this.state
        console.log('TCL: Account -> render -> account', account)

        const columns = [
            {
                Header: 'Account',
                accessor: 'accountRS',
            },
            {
                Header: 'Balance',
                accessor: 'balanceNQT',
            }
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
            </Wrapper>
        )
    }
}

export default Account
