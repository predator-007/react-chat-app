export const recieverreducer=(state:string|null=null,action:{type:string,payload:string|null})=>{
        if(action.type=="reciever")
        {
            return action.payload;
        }
        return state;
}