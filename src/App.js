import React, {Component} from 'react'
import './App.scss'

import NavBar from './components/NavBar'
import NavBarMobile from './components/NavBarMobile'
import Sidebar from './components/Sidebar'
import ScheduleView from './components/ScheduleView'

import SearchClassModal from './components/Modal/SearchClass'
import HelpPage from './components/Modal/HelpPage'
import SearchDepartment from './components/Modal/SearchDepartment'
import SearchClassModal2 from './components/Modal/SearchClass2'
import LoginPage from './components/LoginPage'
import ClassInfo from './components/Modal/ClassInfo'

import Progress from './components/Progress'

const SidebarConductor = props => {
  var sidebarToggle = props.sidebarMenu
  var toggle = props.toggle
  var toggleSearchClassModal = props.toggleSearchClassModal
  var toggleSearchDepartmentModal = props.toggleSearchDepartmentModal
  var toggleLoginPage = props.toggleLoginPage
  switch (props.sidebarMenu){
    case true:
      return <Sidebar
        toggle={toggle}
        toggleSearchClassModal={toggleSearchClassModal}
        toggleSearchDepartmentModal={toggleSearchDepartmentModal}
        toggleLoginPage={toggleLoginPage}
      />
    case false:
      return null
  }
}

const ModalConductor = props => {
  var toggle = props.toggle
  var handleModalUnmount = props.handleModalUnmount
  var toggleSearchClassModal2 = props.toggleSearchClassModal2
  var toggleSearchDepartmentModal = props.toggleSearchDepartmentModal
  switch (props.currentModal) {
    case 'SEARCH_CLASS':
      return (
        <div>
          <SearchClassModal
          toggle = {toggle}
          handleModalUnmount={handleModalUnmount} />
        </div>
      )
    case 'HELP_PAGE':
      return <HelpPage handleModalUnmount={handleModalUnmount} />
    case 'SEARCH_RESULTS':
      return (
        <SearchDepartment
          handleModalUnmount={handleModalUnmount}
          toggleSearchClassModal2={toggleSearchClassModal2}
        />
      )
    case 'SEARCH_CLASS2':
      return (
        <SearchClassModal2
          toggle={toggle}
          handleModalUnmount={handleModalUnmount}
          toggleSearchDepartmentModal={toggleSearchDepartmentModal}
        />
      )
    case 'CLASS_INFO':
      return <ClassInfo handleModalUnmount={handleModalUnmount} />
    default:
      return null
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { //0: home, 1:add class select, 2: correctly add class
      view: 0,
      currentModal: null,
      loginPage: false,
      progressPhase:0,
      sidebarMenu: false,
    }
    this.toggleSearchClassModal = this.toggleSearchClassModal.bind(this)
    this.handleModalUnmount = this.handleModalUnmount.bind(this)
    this.toggleHelpPage = this.toggleHelpPage.bind(this)
    this.toggleSearchDepartmentModal = this.toggleSearchDepartmentModal.bind(
      this,
    )
    this.toggleSearchClassModal2 = this.toggleSearchClassModal2.bind(this)
    this.toggleLoginPage = this.toggleLoginPage.bind(this)
    this.toggleClassInfoModal = this.toggleClassInfoModal.bind(this)
    this.changeProgressPhase = this.changeProgressPhase.bind(this)
    this.toggleSidebarMenu = this.toggleSidebarMenu.bind(this)
  }

  handleModalUnmount() {
    this.setState({currentModal: null})
  }

  toggle = (view) => {
    console.log("view", view)
    this.setState({
      view: view,
    })
  }

  toggleSearchClassModal = () => {
    this.setState({currentModal: 'SEARCH_CLASS'})
  }

  toggleClassInfoModal = () => {
    this.setState({currentModal: 'CLASS_INFO'})
  }

  toggleHelpPage = () => {
    this.setState({currentModal: 'HELP_PAGE'})
  }

  toggleSearchDepartmentModal = () => {
    this.setState({currentModal: 'SEARCH_RESULTS'})
  }

  toggleSearchClassModal2 = () => {
    this.setState({currentModal: 'SEARCH_CLASS2'})
  }

  toggleLoginPage(e) {
    this.setState(prevState => ({loginPage: !prevState.loginPage}))
    e.preventDefault()
  }

  changeProgressPhase(){
    this.setState(prevState =>{
      return {progressPhase: prevState.progressPhase == '2' ? prevState.progressPhase -2 : prevState.progressPhase + 1}
    })
  }

  toggleSidebarMenu = () => {
    this.setState(prevState => ({ sidebarMenu: !prevState.sidebarMenu }))
  }

  render() {
    //this variable should contatin the component
    var view = []
    //change component depending on state
    switch(this.state.view){
      case 0:
        view.push(<ScheduleView toggleSearchClassModal={this.toggleClassInfoModal} />)
        break

      case 1:
        view.push(<Progress
            step={this.state.progressPhase}
            next ={this.changeProgressPhase}/>)
        view.push(<ScheduleView toggleSearchClassModal={this.toggleClassInfoModal} />)
        break
      case 2:
        view.push(<Progress
            step={this.state.progressPhase}
            next ={this.changeProgressPhase}/>)
        view.push(<ScheduleView
          scheduleState="ADD_WORKS"
          toggleSearchClassModal={this.toggleClassInfoModal} />)
        break
    }

    if (this.state.loginPage)
      return <LoginPage toggleLoginPage={this.toggleLoginPage} />
    else {
      return (
        <div>
          <ModalConductor
          toggle = {this.toggle}
            currentModal={this.state.currentModal}
            handleModalUnmount={this.handleModalUnmount}
            toggleSearchClassModal2={this.toggleSearchClassModal2}
            toggleSearchDepartmentModal={this.toggleSearchDepartmentModal}
          />
          <div className="web-navbar">
            <NavBar 
              toggleSearchClassModal={this.toggleSearchClassModal}
              untoggleModal={this.handleModalUnmount}
              toggleHelpPage={this.toggleHelpPage}
            />
          </div>
          <div className="mobile-navbar">
            <NavBarMobile
              untoggleModal={this.handleModalUnmount}
              toggleHelpPage={this.toggleHelpPage}
              toggleSidebarMenu={this.toggleSidebarMenu}
            />
          </div>
          <div className="app">
            <div className="container-sidebar">
              <div className="sidebar-web">
                <Sidebar
                  toggle={this.toggle}
                  toggleSearchClassModal={this.toggleSearchClassModal}
                  toggleSearchDepartmentModal={this.toggleSearchDepartmentModal}
                  toggleLoginPage={this.toggleLoginPage}
                />
              </div>

              <div className="sidebar-mobile">
                <SidebarConductor
                  toggle={this.toggle}
                  toggleSearchClassModal={this.toggleSearchClassModal}
                  toggleSearchDepartmentModal={this.toggleSearchDepartmentModal}
                  toggleLoginPage={this.toggleLoginPage}
                  toggleSidebarMenu={this.toggleSidebarMenu}
                  sidebarMenu={this.state.sidebarMenu}
                />
              </div>
            </div>
            <div className="content">
              {view}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App
