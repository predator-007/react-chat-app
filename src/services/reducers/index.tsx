import { userreducer } from "./user";
import { recieverreducer } from "./reciever";
import { socketreducer } from "./socket";
import { recievingcallreducer } from "./recievingcall";
import { callerreducer } from "./caller";
import { callernamereducer } from "./callername";
import { callersignalreducer } from "./callersignal";
import { callacceptedreducer } from "./callaccepted";
import { callendedreducer } from "./callended";
import { callmodereducer } from "./callmode";
import { onlineUsersReducer } from "./onlineusers";
export const allreducer={
    user:userreducer,
    reciever:recieverreducer,
    socket:socketreducer,
    recievingcall:recievingcallreducer,
    caller:callerreducer,
    callername:callernamereducer,
    callersignal:callersignalreducer,
    callaccepted:callacceptedreducer,
    callended:callendedreducer,
    callmode:callmodereducer,
    onlineUsers:onlineUsersReducer,
}