import React, { Component } from 'react'
import { HashRouter as Route, Route } from 'react-router-dom'

import AccountDashboard  from './AccountDashboard'

import MainTopbar from './MainTopbar'
import ApplicationContainer from './ApplicationContainer'


class MainContainer extends Component {
render() {
return ( 
<div className='ui grid'>
          <MainTopbar />	      <MainTopbar />
          <Route path='/' exact={true} component={DomainsContainer} />	      <Route path='/' exact={true} component={DomainsContainer} />
          <Route path='/apply' exact={true} component={ApplicationContainer} />	      <Route path='/apply' exact={true} component={ApplicationContainer} />
          <Route path='/domains' exact={true} component={DomainsContainer} />	      <Route path='/domains' exact={true} component={DomainsContainer} />
        </div>	    </div>
      </Router>	  
  <Route path='/account' exact component={AccountDashboard} />


)

export default MainContainer
 
