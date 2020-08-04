import React from 'react';
//Field is a component
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';
class StreamCreate extends React.Component{

  //renderInput(formProps){
    //return <input onChange={formProps.input.onChange}  value={formProps.input.value}/>

  //}

//the onsubmit function is passed down as a prop to the streamform
onSubmit=(formValues)=>{
  this.props.createStream(formValues);

};

  render(){
  return(

    <div>
    <h3> Create a Stream</h3>
    <StreamForm onSubmit={this.onSubmit}/>
    </div>

  );
}
}


//creating form wrapped version of stream creaye component

//const formWrapped= reduxForm({
  //form:'streamCreate',
  //validate:validate//referring to the valiadte function
//})(StreamCreate);

//export default connect(null,{createStream})(formWrapped);
export default connect(null,{createStream})(StreamCreate)
