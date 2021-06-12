export const onlineUsersReducer=(state:any={},action:{type:string,payload:{}})=>{
    if(action.type=="onlineUsers")
    {
        return action.payload;
    }
    else{
        return state;
    }
}
