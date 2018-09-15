import React, {Component} from 'react'
import './MainContainer.css'

import { HashRouter as Router, Route } from 'react-router-dom'

import MainTopbar from './MainTopbar'
import ApplicationContainer from './ApplicationContainer'
import DomainsContainer from './DomainsContainer'

return (
    <div className='ui grid'>
      <MainTopbar />

      <CSSTransitionGroup
        transitionName='MainContainerFade'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>

        <Route location={location} key={key}>
          <Switch>
            <Route path='/apply' exact component={ApplicationContainer} />
            <Route path='/domains' exact component={DomainsContainer} />
            <Route path='/' exact component={DomainsContainer} />
          </Switch>
        </Route>
      </CSSTransitionGroup>

    </div>
  )
}
export default MainContainer

