import React from 'react';
import {Field,reduxForm} from 'redux-form';//Field is a component

class StreamForm extends React.Component{

  //renderInput(formProps){
    //return <input onChange={formProps.input.onChange}  value={formProps.input.value}/>

  //}
  renderError({error,touched}){
    if(touched && error){
      return(
        <div className="ui error message">
        <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput=({input,label,meta})=>{

    return (
      <div className="field">
      <label>{label}</label>
      <input{...input} autoComplete="off"/>
      {this.renderError(meta)}
      </div>
    );
  };

onSubmit=(formValues)=>{
  this.props.onSubmit(formValues);

};

  render(){
  return(
    <form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
    <Field name="title" component={this.renderInput} label="enter title"/>
    <Field name="description" component={this.renderInput} label="enter description"/>
    <button className="ui button primary">Submit</button>
    </form>

  );
}
}

const validate=(formValues)=>{
  const errors={};
  if(!formValues.title){
    errors.title="you must enter a title";
  }
  if(!formValues.description){
    errors.description="you must enter a description";
  }
  return errors;
};
//creating form wrapped version of stream creaye component

export default reduxForm({
  form:'streamForm',
  validate:validate//referring to the valiadte function
})(StreamForm);
