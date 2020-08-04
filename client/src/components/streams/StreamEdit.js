import React from 'react';
import {connect} from 'react-redux';
import {fetchStream,editStream} from '../../actions';
import StreamForm from './StreamForm';
class StreamEdit extends React.Component{

componentDidMount(){
  this.props.fetchStream(this.props.match.params.id);

}
onSubmit=(formValues)=>{
  this.props.editStream(this.props.match.params.id,formValues);

};


//if statement requited as if we directly do stream.title we will get undefined as streams may not have been fetched by that time
render()
{
  //console.log(this.props);
  //return <div>StreamEdit</div>;
  if(!this.props.stream){
    return <div>Loading...</div>;
  }
  return (
    <div>
    <h3>Edit a stream</h3>
    <StreamForm initialValues={{title:this.props.stream.title,description:this.props.stream.description}} onSubmit={this.onSubmit}/>
    </div>
  );
}
}
const mapStateToProps=(state,ownProps)=>{
  //console.log(state);
  //console.log(ownProps);
  return{stream:state.streams[ownProps.match.params.id]};
};
export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);
