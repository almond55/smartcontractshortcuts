import Web3 from 'web3'
import {
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded,
    abcTokenLoaded,
    smolTokenLoaded,
    exchangeLoaded
} from './actions'
import Token from '../abis/Token.json'
import SmolToken from '../abis/SmolToken.json'
import ABCToken from '../abis/ABCToken.json'
import Exchange from '../abis/Exchange.json'


export const loadWeb3 = (dispatch) => {
    const web3 = new Web3(window.ethereum)
    //const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    dispatch(web3Loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))
    return account
}

export const loadToken = async (web3, networkId, dispatch) => {
    try {
        const contract = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
        dispatch(tokenLoaded(contract))
        return contract
    } catch(error) {
        console.log('Token contract not deployed to the current network')
        return null
    }
}

export const loadSmolToken = async (web3, networkId, dispatch) => {
    try {
        const contract = new web3.eth.Contract(SmolToken.abi, SmolToken.networks[networkId].address)
        dispatch(smolTokenLoaded(contract))
        return contract
    } catch(error) {
        console.log('SmolToken contract not deployed to the current network')
        return null
    }
}

export const loadABCToken = async (web3, networkId, dispatch) => {
    try {
        const contract = new web3.eth.Contract(ABCToken.abi, ABCToken.networks[networkId].address)
        dispatch(abcTokenLoaded(contract))
        return contract
    } catch(error) {
        console.log('ABCToken contract not deployed to the current network')
        return null
    }
}

export const loadExchange = async (web3, networkId, dispatch) => {
    try {
        const contract = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
        dispatch(exchangeLoaded(contract))
        return contract
    } catch(error) {
        console.log('Exchange contract not deployed to the current network')
        return null
    }
}

export const loadAllOrders = async (exchange) => {
    const cancelStream = exchange.getPastEvents(
        'Cancel', { fromBlock: 0, toBlock: 'latest' }
    )
}
