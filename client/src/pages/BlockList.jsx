import React, { Component } from 'react'
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
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Block Height',
                accessor: 'block.height',
                filterable: true,
            },
            {
                Header: 'Block Hash',
                accessor: 'block.hash',
                filterable: false,
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
