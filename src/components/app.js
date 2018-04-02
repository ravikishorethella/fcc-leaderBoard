import React, { Component } from 'react';
import axios from 'axios';

// importing the first child component
import CamperList from './camper_list.js';

// import CamperListItem from './camper_list_item.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentCampers: [],
      allTimeCampers: [],
      currentView: 'recentCampers'
    };
  }

  componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
      .then(axios.spread((recentCampers, allTimeCampers) => {
        // Both requests are now complete
        // setting the state 
        console.log(recentCampers);
        this.setState({
          recentCampers: recentCampers.data,
          allTimeCampers: allTimeCampers.data
        });
      }));
  }

  // helper methods

  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAllTimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeView(currentView) {
    this.setState({ currentView });
  }

  render() {
    if (!this.state.recentCampers.length && !this.state.allTimeCampers.length) {
      return <div style={{ textAlign: 'center' }}> Loading ... </div >
    }
    return (
      <div>
        <h1>FCC LeaderBoard</h1>
        <h2> {`Viewing Top ${this.state.currentView}`} </h2>
        <button style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => this.changeView('recentCampers')} className="btn btn-primary">Last 30 days</button>
        <button style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => this.changeView('allTimeCampers')} className="btn btn-primary">All Time</button>
        <CamperList campers={this.state[this.state.currentView]} />
        <h4>Made with &#10084; By <a href="https://www.ravikishorethella.com" target="_blank"> Ravi K Thella</a></h4>
      </div>
    );
  }
}
