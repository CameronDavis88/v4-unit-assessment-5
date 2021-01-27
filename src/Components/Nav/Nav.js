import React, { Component } from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom'
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import {connect} from 'react-redux'
import {updateUser, logout} from '../../redux/reducer'
import './Nav.css';




class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => updateUser(res.data))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(() => {this.props.logout()
      this.props.history.push('/')})
  }
  
  render() {
    console.log(this.props)
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic' style={{backgroundImage: "url(" + `https://robohash.org/${this.props.username}.png` + ")"}}>
            </div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
            <Link to={'Dash'}>
            <img className='nav-img' src={homeLogo} alt='home' />
            </Link>
            <Link to={'Form'}>
            <img className='nav-img' src={newLogo} alt='new post' />
            </Link>
          </div>
          <Link to={'Auth'} onClick={this.logout}>
          <img className='nav-img logout' src={logoutLogo} alt='logout' />
          </Link>
        </div>
  }
}

const mapStateToProps = reduxState => reduxState;


// I wasnt sure here and just copied from lecture code

export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav))

