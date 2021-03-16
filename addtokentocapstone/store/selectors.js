import { get } from 'lodash'
import { createSelector } from 'reselect'

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const smolTokenLoaded = state => get(state, 'smolToken.loaded', false)
export const smolTokenLoadedSelector = createSelector(smolTokenLoaded, st => st)

const abcTokenLoaded = state => get(state, 'abcToken.loaded', false)
export const abcTokenLoadedSelector = createSelector(abcTokenLoaded, abc => abc)

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

export const contractsLoadedSelector = createSelector(
  tokenLoaded,
  smolTokenLoaded,
  abcTokenLoaded,
  exchangeLoaded,
  (tl, st, abc, el) => (tl && st && abc && el)
)