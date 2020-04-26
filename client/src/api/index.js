import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3030/api/',
})

export const createBlock = payload => api.post(`/block`, payload)
export const getBlocks = () => api.get(`/blocks`)
export const updateBlock = (id, payload) => api.put(`/block/${id}`, payload)
export const getBlock = id => api.get(`/block/${id}`)
export const getTxs = () => api.get(`/txs`)
export const getTx = id => api.get(`/tx/${id}`)
export const getAccount = id => api.get(`/account/${id}`)
export const getAccountTxs = id => api.get(`/accounts/${id}`)
export const updateAccount = (id, payload) => api.put(`/account/${id}`, payload)
export const recordAccount = payload => api.post(`/account/`, payload)
export const recordPeer = payload => api.post(`/peer`, payload)
export const getPeers = () => api.get(`/peers`)
export const recordGenerator = payload => api.post(`/generator`, payload)
export const getGenerators = () => api.get(`/generators`)
export const getLastBlock = () =>  api.get(`/blocks/last`)
export const getMaxSupply = () =>  api.get(`/utils/maxsupply`)
export const getSupply = () =>  api.get(`/utils/supply`)
export const getCirculatingSupply = () =>  api.get(`/utils/circulatingsupply`)
export const saveMaxSupply = payload => api.post(`/utils/savemaxsupply/`, payload)
export const getIndexPrice = () =>  api.get(`/utils/indexprice`)

const apis = {
    createBlock,
    updateBlock,
    getBlocks,
    getBlock,
    getTx,
    getTxs,
    getAccount,
    getAccountTxs,
    updateAccount,
    recordAccount,
    recordPeer,
    getPeers,
    recordGenerator,
    getGenerators,
    getLastBlock,
    getMaxSupply,
    getSupply,
    getCirculatingSupply,
    saveMaxSupply,
    getIndexPrice,
}

export default apis
