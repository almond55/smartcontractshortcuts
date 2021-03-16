export function web3Loaded(connection) {
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account
    }
}

export function tokenLoaded(contract) {
    return {
        type: 'TOKEN_LOADED',
        contract
    }
}

export function smolTokenLoaded(contract) {
    return {
        type: 'SMOLTOKEN_LOADED',
        contract
    }
}

export function abcTokenLoaded(contract) {
    return {
        type: 'ABCTOKEN_LOADED',
        contract
    }
}

export function exchangeLoaded(contract) {
    return {
        type: 'EXCHANGE_LOADED',
        contract
    }
}

