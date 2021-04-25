export const callendedreducer=(state:boolean=false,action:{type:string,payload:boolean})=>{
    if(action.type=="callended")
    {
        return action.payload;
    }
    return state;
}