import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 2% 20% 10% 20%;
    text-align: center;
    font-size: 12px;
`

class Generators extends Component {
    constructor(props) {
        super(props)
        this.state = {
            generatorData: '',
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getGenerators().then(generatorData => {
            this.setState({
                generatorData: generatorData.data.data[0].generators,
                isLoading: false,
            })
        })
    }

    render() {
        const { generatorData, isLoading } = this.state
        console.log('TCL: Generator -> render -> generator', generatorData)

        const columns = [
            {
                Header: 'Forger Address',
                accessor: 'accountRS',
                width: 200,
                Cell: function(props) {
                    return (
                        <span>
                            <Link to={`/api/account/${props.original.accountRS}`}>{props.original.accountRS}</Link>
                        </span>
                    )
                },
            },
            {
                Header: 'Effective Balance',
                accessor: 'effectiveBalanceNXT',
                width: 200,
                Cell: function(props) {
                    return (
                        <span>
                            {Number(props.original.effectiveBalanceNXT).toFixed(8) || 0} JUP
                        </span>
                    )
                },
            },
            {
                Header: 'Deadline',
                accessor: 'deadline',
                width: 200,
            },
            {
                Header: 'Hit Time',
                accessor: 'hitTime',
                width: 200,
            },
        ]

        let showTable = true
        if (!generatorData.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={generatorData}
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

export default Generators
