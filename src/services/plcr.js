import sha3 from 'solidity-sha3'
import pify from 'pify'

import token from '../token'
import store from '../store'
import { getAbi } from '../config'

const abi = getAbi('plcr')



class PlcrService {
constructor () {
    this.plcr = null
    this.address = null
     this.initContract()
  }
   async initContract () {
    if (!window.web3) {
      return false
    }
     const registry = require('./registry').default
     if (!this.plcr && registry && registry.getPlcrAddress) {
      const address = await registry.getPlcrAddress()
      const plcr = await window.web3.eth.contract(abi).at(address)
       this.address = address
      this.plcr = plcr
    }
  }
async getPoll (pollId) {
    return new Promise(async (resolve, reject) => {
      if (!pollId) {
        reject(new Error('PollId is required'))
        return false
      }
       if (!this.plcr) {
        await this.initContract()
      }
       const result = await pify(this.plcr.pollMap)(pollId)
       const map = {
        // proposal to be voted for/against
        proposal: result[0],
        // expiration date of commit period for poll
        commitEndDate: result[1].toNumber() : null,
        // expiration date of reveal period for poll
        revealEndDate: result[2].toNumber() : null,
        // number of votes required for a proposal to pass
        voteQuorum: result[3].toNumber() : 0,
        // tally of votes supporting proposal
        votesFor: result[4].toNumber() : 0,
        // tally of votes countering proposal
        votesAgainst: result[5].toNumber() : 0
      }
       resolve(map)
    })
  }
   async commitPeriodActive (pollId) {
    return new Promise(async (resolve, reject) => {
      if (!pollId) {
        reject(new Error('PollId is required'))
        return false
      }
       if (!this.plcr) {
        await this.initContract()
      }
       const result = pify(this.plcr.commitPeriodActive)(pollId);
      resolve(result)
    })
  }
   async revealPeriodActive (pollId) {
    return new Promise(async (resolve, reject) => {
      if (!pollId) {
        reject(new Error('PollId is required'))
        return false
      }
       if (!this.plcr) {
        await this.initContract()
      }
       const result = await pify(this.plcr.revealPeriodActive)(pollId);
      resolve(result)
    })
  }
  










 async commit ({pollId, hash, tokens, prevPollId}) {
    return new Promise(async (resolve, reject) => {
      if (!pollId) {
        reject(new Error('PollId is required'))
        return false
      }
       if (!hash) {
        reject(new Error('Hash is required'))
        return false
      }
       if (!tokens) {
        reject(new Error('Tokens are required'))
        return false
      }
       if (!this.plcr) {
        await this.initContract()
      }
       const active = await pify(this.plcr.commitPeriodActive.call)(pollId);
       if (!active) {
        reject(new Error('Commit stage should be active'))
        return false
      }
       const approveTx = await pify(this.plcr.requestVotingRights)(tokens)
      await this.getTransactionReceipt(approveTx)
       const result = await pify(this.plcr.commitVote)(pollId, hash, tokens, prevPollId)
       store.dispatch({
        type: 'PLCR_VOTE_COMMIT',
        pollId
      })
       resolve(result)
    })
  }
async reveal ({pollId, voteOption, salt}) {
    return new Promise(async (resolve, reject) => {
      const tx = await pify(this.plcr.revealVote)(pollId, salt, voteOption)
      await this.getTransactionReceipt(tx)
       store.dispatch({
        type: 'PLCR_VOTE_REVEAL',
        pollId
      })
       resolve()
    })
  }
  



   async getTokensCommited (pollId) {
    return new Promise(async (resolve, reject) => {
      const numTokens = await this.plcr.getNumTokens(pollId);
       resolve(numTokens)
    })
  }
   async getTransactionReceipt (tx) {
    return new Promise(async (resolve, reject) => {
      if (!this.registry) {
        this.initContract()
      }
       const result = await pify(window.web3.eth.getTransactionReceipt)(tx)
       resolve(result)
    })
  }
 }
 export default new PlcrService()

