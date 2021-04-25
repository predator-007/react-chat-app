export const callacceptedreducer=(state:boolean=false,action:{type:string,payload:boolean})=>{
    if(action.type=="callaccepted")
    {
        return action.payload;
    }
    return state;
}