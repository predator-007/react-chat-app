export const recieverreducer=(state:any=null,action:{type:string,payload:any})=>{
        if(action.type=="reciever")
        {
            return action.payload;
        }
        return state;
}