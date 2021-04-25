export const callersignalreducer=(state:any=null,action:any)=>{
    if(action.type=="callersignal")
    {
        return action.payload;
    }
    return state;
}