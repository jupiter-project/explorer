import axios from 'axios'

const api = axios.create({
    baseURL: 'http://newexplorerapi.gojupiter.tech/api/',
})

export const createBlock = payload => api.post(`/block`, payload)
export const getBlocks = () => api.get(`/blocks`)
export const updateBlock = (id, payload) => api.put(`/block/${id}`, payload)
export const getBlock = id => api.get(`/block/${id}`)
export const getTxs = () => api.get(`/txs`)
export const getTx = id => api.get(`/tx/${id}`)
export const getAccount = id => api.get(`/account/${id}`)

const apis = {
    createBlock,
    updateBlock,
    getBlocks,
    getBlock,
    getTxs,
    getTx,
    getAccount,
}

export default apis
