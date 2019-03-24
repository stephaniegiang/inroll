import React, { Component } from 'react';
import './App.scss';

import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import ScheduleView from './components/ScheduleView'

class App extends Component {
  //state to change the vierw change as requred
  state = {
    view: true
  }

  //function to react to button click, change this as required
  toggle = () =>{
    console.log(this.state.view)
    this.setState(
      {
        view: !this.state.view
      });
  }

  render() {

    //this variable should contatin the component
     var view = ""
     //chan ge component depending on state
    if(this.state.view){
      view = <ScheduleView/>
    }
    //change sidebar toggle, to pass the function changing state to the side bar
    return (
      <div>
        <NavBar />
        <div className="app">
          <Sidebar toggle={this.toggle}/>

          <div class="content">
            {view}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
