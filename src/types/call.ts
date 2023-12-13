export interface Call {
    callId: string;
    media: string;
    startDate: string;
    service: string;
    caller: string;
}

export interface ResponseUserName {
    username: string;
}

export interface ErrorConnectionUser {
    username: string;
    maxCalls: number;
    error: string;
}

export interface ResponseEndCallError {
    callId: string;
    error: string;
}