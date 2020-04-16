import React from "react";
import AppNav from './AppNav';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBMask,MDBRow,MDBCol,MDBView,MDBContainer,MDBAnimation} from "mdbreact";
import "./Home1.css";

class Home1 extends React.Component {
  state = {
    collapsed: false
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      <div id="apppage">
          <AppNav/>

        <div>
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBCol
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Expense Tracker Application
                    </h1>
                    <hr className="hr-light" />
                    <h5 className="mb-4">
                    Expense Tracker Application - your personalised check on expenses
                    </h5>
                    <h6 className="mb-4">
                    Expense tracker offers you an easy and facile way to
                      track one's expenses.<br/>
                      As students who are going to graduate and get into the real world , 
                      ensuring your savings doesn't get a hole is very important.
                    Your expenses will never go out of your budget 
                        <br/><br/>
                        Start your expense planning TODAY!
                    </h6>
                  </MDBAnimation>
                </MDBCol>

                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        </div>
      </div>
    );
  }
}

export default Home1;
/*
<MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                This is the bottom of the page.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
*/