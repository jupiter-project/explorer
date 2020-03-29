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
                generatorData: generatorData.data.data,
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
                // Cell: function(props) {
                //     return (
                //         <span>
                //             {props.original.peers[0]}
                //         </span>
                //     )
                // },
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
                        defaultPageSize={1}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default Generators
