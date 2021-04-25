export const callerreducer=(state:string="",action:{type:string,payload:string})=>{
    if(action.type=="caller")
        {
            return action.payload;
        }
    return state;
}