export const userreducer=(state:any=null,action:{type:string,payload:{}})=>{
    if(action.type=="user")
    {
        return action.payload;
    }
    return state;

}