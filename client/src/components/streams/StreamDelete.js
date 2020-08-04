import React from 'react';
import Modal from '../Modal';

import {connect} from 'react-redux';
import {deleteStream,fetchStream} from '../../actions';
import history from '../../history';
import {Link} from 'react-router-dom';


class  StreamDelete extends React.Component{
  //onDelete=(id)=>{
    //this.props.editStream(this.props.match.params.id);

//  }

  //console.log(props);
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions(){
    const id=this.props.match.params.id;
  return(

    <React.Fragment>
    <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">Delete</button>
    <Link to ="/" className="ui button">Cancel</Link>
    </React.Fragment>
  );
}


renderContent(){
  if(!this.props.stream){
    return 'Are you sure you want to delete this stream?'
  }

  return `Are you sure you want to delete this stream with title:${this.props.stream.title}`
}
  render(){

  return(

     <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={()=>history.push('/')}
     />

   );
 }
}

const mapStateToProps=(state,ownProps)=>{
  //console.log(state);
  //console.log(ownProps);
  return{stream:state.streams[ownProps.match.params.id]};
  //return {id:streams};
};
export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);
