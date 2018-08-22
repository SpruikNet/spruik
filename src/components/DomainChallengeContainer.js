import React, { Component } from 'react'
import commafy from 'commafy'
import moment from 'moment'

import { Popup } from 'semantic-ui-react'
import Countdown from './CountdownText'
import registry from '../services/registry'


import './DomainChallengeContainer.css'

class DomainChallengeContainer extends Component {
  constructor (props) {
    super()

    this.state = {

    }
  }

  render () {
    const blocksRemaining = 9180

    return (
      <div className='DomainChallengeContainer'>
        <div className='ui grid stackable'>
          <div className='column sixteen wide'>
            <strong>IN APPLICATION</strong>
          </div>
<Popup
                trigger={<i className='icon info circle'></i>}
                content='ADT holders are encouraged to challenge publisher applications where the token holders believe the Publisher to be fraudulent.'
              />
          





<div className='column sixteen wide'>
            <p>ADT holders are encouraged to challenge publisher applications where the token holders believe the Publisher to be fraudulent.</p>
          </div>
          <div className='column sixteen wide center aligned'>
            <div className='ui divider' />
            <p>Blocks remaining until challenge period ends</p>
            <p><strong>{commafy(blocksRemaining)} blocks</strong></p>
            <p><small>or approximately: 02 days, 14 hours, and 49 minutes</small></p>
            <div className='ui divider' />
          </div>
          <div className='column sixteen wide center aligned'>
            <p>100,000,000 ADT needed to Challenge</p>
          </div>
          <div className='column sixteen wide center aligned'>
            <button className='ui button purple'>
              CHALLENGE
            </button>
          </div>
        </div>
      </div>
    )
  }
}

  async getMinDeposit () {
    this.setState({
      minDeposit: await registry.getMinDeposit()
    })
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

  onChallenge (event) {
    event.preventDefault()

    this.challenge()
  }

  async challenge () {
    const {domain} = this.state

    let inApplication = null

    try {
      inApplication = await registry.applicationExists(domain)
    } catch (error) {
      toastr.error(error)
    }

    if (inApplication) {
      this.setState({
        inProgress: true
      })

      try {
        await registry.challenge(domain)

        toastr.success('Challenged')
        this.setState({
          inProgress: false
        })

        // TODO: better way of resetting state
        setTimeout(() => {
          window.location.reload()
        }, 1e3)
      } catch (error) {
        toastr.error(error.message)
        this.setState({
          inProgress: false
        })
      }
    } else {
      toastr.error('Domain not in application')
    }
  }
}

DomainChallengeContainer.propTypes = {
  domain: PropTypes.string
}

export default DomainChallengeContainer

