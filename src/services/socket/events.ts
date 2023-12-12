export enum SocketEvents {
    USER_CONNECT = 'USER_CONNECT',
    USER_CONNECTED = 'USER_CONNECTED',
    USER_CONNECTION_ERROR = 'USER_CONNECTION_ERROR',

    USER_DISCONNECT = 'USER_DISCONNECT',
    USER_DISCONNECTED = 'USER_DISCONNECTED',
    USER_DISCONNECTION_ERROR = 'USER_DISCONNECTION_ERROR',

    NEW_CALL = 'NEW_CALL',
    NEW_CALL_ANSWERED = 'NEW_CALL_ANSWERED',
    NEW_CALL_ERROR = 'NEW_CALL_ERROR',
    
    END_CALL = 'END_CALL',
    CALL_ENDED = 'CALL_ENDED',
    END_CALL_ERROR = 'END_CALL_ERROR',
}