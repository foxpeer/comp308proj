import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component{
  constructor(){
    super();
    this.state = {
      menuItem:[
        {login:"Login"},
        {register: "Register"},
        {student: "Student"},
        {logout: "LogOut"},
        {displaycourses:"DisplayCourse"},
        {home: "Home"},
        {userName:""}
      ]
    }
  }
  
  componentDidMount(){
    this.setState({ userName : localStorage.userName});
  }
    logOut(e) {
        e.preventDefault();
        //localStorage.setItem('studentName', "");
        localStorage.removeItem('usertoken');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');

        this.props.history.push('/');
    }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav mr-auto" >
                <li className="nav-item" >
                    <Link to="/login" className="my-nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="my-nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );

        //this.setState({ userName : localStorage.studentName});
        const workingLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/profile" className="my-nav-link">
                        {this.state.userName}
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" onClick={this.logOut.bind(this)} className="my-nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        );

        const adminLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/displayUsers" className="my-nav-link">
                        Users
                    </Link>
                </li>
            </ul>
        );
        const patientLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/createReport" className="my-nav-link">
                        CreateReport
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/myReport" className="my-nav-link">
                        MyReports
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-dark navbar-expand bg-primary justify-content-between">
                
                <div className="d-flex flex-row bd-highlight mb-3 ustify-content-around" id="navbar1">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="my-nav-link">
                            Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken && localStorage.email !== 'admin@yahoo.ca' ? patientLink : null}
                    { localStorage.email === 'admin@yahoo.ca' ? adminLink : null}
                </div>
                <div className="d-flex flex-reverse bd-highlight mb-3 ustify-content-around" id="navbar2">
                    {localStorage.usertoken ? workingLink : loginRegLink}
                </div>
            </nav>
            
        );
    }

}

export default withRouter(Navbar)
