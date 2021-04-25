export const callernamereducer=(state:string="",action:{type:string,payload:string})=>{
    if(action.type=="callername")
    {
        return action.payload;
    }
    return state;
}