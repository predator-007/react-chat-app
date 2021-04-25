export const socketreducer=(state=null,action:any)=>{
    if(action.type=="socket")
    {
        return action.payload;
    }
    return state;
}