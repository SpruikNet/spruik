import React, { Component } from 'react'
import MainSidebar from './components/MainSidebar'
import MainContainer from './components/MainContainer'
import {
  BrowserRouter  as Router,
  Route,
  NavLink as Link,
  Switch
} from 'react-router-dom'
 import CSSTransitionGroup from 'react-addons-css-transition-group'


import './App.css'
class App extends Component {
  render () {
    <Router>
<Route render={({ location }) => (
          <div	
            className='MainSidebarWrap column four wide'>	        <div className='App'>
            <MainSidebar Link={Link} />	          <div className='ui grid stackable'>
          </div>	            <div
          <div className='MainContainerWrap column twelve wide'>	              className='MainSidebarWrap column four wide'>
            <MainContainer Route={Route} />	              <MainSidebar Link={Link} />
            </div>
            <div className='MainContainerWrap column twelve wide'>
              <MainContainer
                Route={Route}
                CSSTransitionGroup={CSSTransitionGroup}
                Switch={Switch}
                location={location} />
            </div>
          </div>	          </div>
        </div>	        </div>
      </div>	      )}/>
     </Router>	   
  )	 
)
  }
} 



export default App

