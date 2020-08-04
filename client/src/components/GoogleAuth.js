import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends React.Component{

componentDidMount(){
  window.gapi.load('client:auth2',()=>{
    window.gapi.client.init({//asychronous callback to google to initialise our client
       clientId:'563120941617-gdpkjh1m3p55kppo8eum87n7231ssmbr.apps.googleusercontent.com',
      scope:'email'
    }).then(()=>{

    this.auth=window.gapi.auth2.getAuthInstance();//action to whether the user is signed In or not as recieved by the gapi we call the appropriate action creater
   this.onAuthChange(this.auth.isSignedIn.get());
   this.auth.isSignedIn.listen(this.onAuthChange);
    });
  });//the arroe function is called only after the client auth2 has succesfullty loaded into the gapi
}

onAuthChange=(isSignedIn)=>{
  if(isSignedIn){
    this.props.signIn(this.auth.currentUser.get().getId()); //action creater received as props//receive the id aslo
  }
  else{
    this.props.signOut();
  }

};

onSignInClick=()=>{
  this.auth.signIn();

};

onSignOutClick=()=>{


  this.auth.signOut();
};


renderAuthButton(){
  if(this.props.isSignedIn===null){
    return null;
  }
  else if(this.props.isSignedIn){
    return(
      <button  onClick={this.onSignOutClick} className="ui red google button">
      <i className="google icon"/>
      Sign Out
      </button>
  );
  }
  else {
    return (
      <button  onClick={this.onSignInClick} className="ui red google button">
      <i className="google icon"/>
      Sign In with Google
      </button>

    );
  }
}


  render(){
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps=(state)=>{
  return {isSignedIn:state.auth.isSignedIn};

};

  export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
