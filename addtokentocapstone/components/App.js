import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import Content from './Content'
import { connect } from 'react-redux'
import { 
  loadWeb3,
  loadAccount,
  loadToken,
  loadSmolToken,
  loadABCToken,
  loadExchange
} from '../store/interactions'
import { contractsLoadedSelector } from '../store/selectors'



class App extends Component {
  componentDidMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    const smolToken = await loadSmolToken(web3, networkId, dispatch)
    const abcToken = await loadABCToken(web3, networkId, dispatch)
    const msg = 'smart contract not detected on current network. Please choose another network and refresh.'
    if(!token) {
      window.alert('Token ' + msg)  
    }
    if(!smolToken) {
      window.alert('SmolToken ' + msg)  
    }
    if(!abcToken) {
      window.alert('ABCToken ' + msg)  
    }
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {
      window.alert('Exchange ' + msg)
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}
export default connect(mapStateToProps)(App)