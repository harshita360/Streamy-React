

import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
}
from './types';


 export const signIn=(userId)=>{
   return{
     type:SIGN_IN,
     payload:userId
   };
 };

 export const signOut=()=>{
   return{
     type:SIGN_OUT,

   };
 };
//receive id as argument and pass it to reducers

export  const createStream=(formValues)=>{
  return async (dispatch,getState)=>{//getState helps us to fetchbthe userid of the person who creates the stream
 const {userId}=getState().auth;
const response= await streams.post('/streams',{...formValues,userId});//making post request with axios

dispatch({type:CREATE_STREAM,payload:response.data});

history.push('/');//new location to naviagte to
  };
};

export const fetchStreams=()=>{
  return async(dispatch)=>{
    const response=await streams.get('/streams');
   //we ony want to trigger nagivation from our create stream oage to the stream list after getting successful response from the api
    dispatch({type:FETCH_STREAMS,payload:response.data});

  };
};

export const fetchStream=(id)=>{
  return async(dispatch)=>{
    const response= await streams.get(`/streams/${id}`);
   dispatch({type:FETCH_STREAM,payload:response.data});
 };
};

export const editStream=(id,formValues)=>{
  return async(dispatch)=>{
    const response=await streams.patch(`/streams/${id}`,formValues);
     dispatch({type:EDIT_STREAM,payload:response.data});
     history.push('/');
  };
};

export const deleteStream=(id)=>{
  return async(dispatch)=>{
    const response= await streams.delete(`/streams/${id}`);
   dispatch({type:DELETE_STREAM,payload:id});
   history.push('/');
 };
};
