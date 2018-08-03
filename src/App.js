import React, { Component } from 'react'
import MainSidebar from './components/MainSidebar'
import MainContainer from './components/MainContainer


import './App.css'
class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='ui grid stackable'>
          <div
            className='MainSidebarWrap column four wide'>
            <MainSidebar />
          </div>
          <div className='MainContainerWrap column twelve wide'>
            <MainContainer />
          </div>
        </div>
      </div>
    )
  }
} 



export default App
