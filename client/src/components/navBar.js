import React from 'react';
import WriteReview from './writeReview.js';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: ["Home"],
      activeLinkId: 0,
      modalActive: false,
    };
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  renderLinks(navBarState) {
    let navBar = [];
    for (var i = 0; i < navBarState.links.length; i++) {
      const linkName = navBarState.links[i];
      const isActive = (i === navBarState.activeLinkId);
      // return this.renderLink(linkName, isActive);
      navBar.push(this.renderLink(i, linkName, isActive));
    }
    return(navBar);
  }

  renderLink(linkId, linkName, isActive) {
    return(
      <NavBarLink
        key={linkId}
        linkName={linkName}
        isActive={isActive}
        onClick={() => this.handleNavLinkClick(linkId)}
      />
    );
  }

  handleNavLinkClick(linkId) {
    let linksCopy = this.state.links.slice();
    if (linkId !== this.state.activeLinkId) {
      this.setState({
        links: linksCopy,
        activeLinkId: linkId,
      });
    }
  }

  modalOpen() {
    this.setState({
      modalActive: true
    });
    disableBodyScroll(document.getElementsByTagName("BODY")[0]);
  }

  modalClose() {
    this.setState({
      modalActive: false
    });
    enableBodyScroll(document.getElementsByTagName("BODY")[0]);
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log(bottom);
  }

  render() {
    console.log("RENDER: navBar");
    let modalContainerClass = this.state.modalActive ? "modalContainer active": "modalContainer";
    let navBarWriteReviewLinkClass = this.props.navBarQuackActive ? "writeReviewLink navBarWriteReviewLink z-depth-2 active" : "writeReviewLink navBarWriteReviewLink z-depth-2";
    return(
      <div className="navBarGeneralContainer generalContainer">
        <div className="contentContainer navBarContentContainer">
          <div className="navBarSectionLeft">
            <img className="navBarLogo" src={require('../images/logoOriginalIndigo.png')} alt="Quack" />
            {this.renderLinks(this.state)}
          </div>
          <div id="navBarWriteReviewLink button" className={navBarWriteReviewLinkClass} onClick={() => this.modalOpen()}>
            <span>Quack</span>
          </div>
          <div className={modalContainerClass}>
            <div className="modalBackground button" onClick={() => this.modalClose()}> </div>
            <div className="modal writeReviewModal">
              <WriteReview/>
            </div>
          </div>
          {/*<div className="navBarSectionRight"></div>*/}
        </div>
      </div>
    );
  }
}

function NavBarLink(props) {
  const classes = props.isActive ? "navBarLink button active" : "navBarLink button";

  return (
    <div className={classes} onClick={props.onClick}>
      <span className="navBarLinkText">{props.linkName}</span>
      <div className="navBarLinkUnderline"></div>
    </div>
  );
}

export default NavBar;