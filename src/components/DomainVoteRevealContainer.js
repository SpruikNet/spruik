import React, { Component } from 'react'
import commafy from 'commafy'
import toastr from 'toastr'
import moment from 'moment'


import './DomainVoteRevealContainer.css'

class DomainVoteRevealContainer extends Component {
  constructor (props) {
    super()

    this.state = {
  domain: props.domain,
      applicationExpiry: null,
      votesFor: 0,
      votesAgainst: 0
    }	    }
     this.getListing()
    this.getPoll()
  }	  }

    }
  }

  render () {
    const blocksRemaining = 1239
 const {
      applicationExpiry,
      domain,
      votesFor,
      votesAgainst
    } = this.state
     const stageEnd = applicationExpiry ? moment.unix(applicationExpiry).format('YYYY-MM-DD HH:mm:ss') : '-'

    return (
      <div className='DomainChallengeContainer'>
        <div className='ui grid stackable'>
          <div className='column sixteen wide'>
            <strong>VOTING – REVEAL</strong>
          </div>
          <div className='column sixteen wide'>
            <p>
The first phase of the voting process is the commit phase where the ADT holder stakes a hidden amount of ADT to SUPPORT or OPPOSE the domain application. The second phase is the reveal phase where the ADT holder reveals the staked amount of ADT to either the SUPPORT or OPPOSE side.
            </p>
          </div>
          <div className='column sixteen wide center aligned'>
            <div className='ui divider' />
            <p>
          Total ADT already committed by the general ADT community:
            </p>
            <p>
              <strong>99,000 ADT</strong>
            </p>
            <div className='ui divider' />
            <p>
          Blocks remaining until reveal period ends
            </p>
            <p><strong>{commafy(blocksRemaining)} blocks</strong></p>
            <p><small>or approximately: 02 days, 14 hours, and 49 minutes</small></p>
            <div className='ui divider' />
          </div>
          <div className='column sixteen wide center aligned'>
            <p>
              Your latest commit was <strong>10,000 ADT</strong> to <strong>OPPOSE</strong>
the Publisher’s application into the adChain Registry
            </p>
            <button className='ui button blue'>
              REVEAL
            </button>
          </div>
        </div>
      </div>
    )
  }
 async getListing () {
    const {domain} = this.state
    const listing = await registry.getListing(domain)
     const {
      applicationExpiry
    } = listing
     this.setState({
      applicationExpiry
    })
  }
   async getPoll () {
    const {domain} = this.state
    const {
      votesFor,
      votesAgainst
    } = await registry.getChallengePoll(domain)
     this.setState({
      votesFor,
      votesAgainst
    })
  }
   async onReveal (event) {
    event.preventDefault()
     const {domain} = this.state
    const salt = 123
    const voteOption = 1
     try {
      const result = await registry.revealVote({domain, voteOption, salt})
      toastr.success('Success')
    } catch (error) {
      toastr.error(error.message)
    }
  }
}	}






export default DomainVoteRevealContainer
