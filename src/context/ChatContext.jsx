import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext, useUser } from "./AuthContext";
import { auth } from "../firebase-config";

export const ChatContext = createContext(null)


export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: null,
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    return useContext(ChatContext)
}