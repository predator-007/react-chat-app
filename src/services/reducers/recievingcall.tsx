export const recievingcallreducer=(state:boolean=false,action:{type:string,payload:boolean})=>{
    if(action.type=="recievingcall")
    {
        return action.payload;
    }
    return state;
}