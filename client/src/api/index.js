import axios from 'axios'

const api = axios.create({
    baseURL: 'http://newexplorerapi.gojupiter.tech/api/',
})

export const createBlock = payload => api.post(`/block`, payload)
export const getBlocks = () => api.get(`/blocks`)
export const updateBlock = (id, payload) => api.put(`/block/${id}`, payload)
export const getBlockId = id => api.get(`/block/${id}`)
export const getTxs = () => api.get(`/txs`)

const apis = {
    createBlock,
    updateBlock,
    getBlocks,
    getBlockId,
    getTxs,
}

export default apis
