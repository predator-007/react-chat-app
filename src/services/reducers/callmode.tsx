export const callmodereducer=(state:boolean=false,action:{type:string,payload:boolean})=>{
    if(action.type=="callmode")
    {
        return action.payload;
    }
    return state;
}