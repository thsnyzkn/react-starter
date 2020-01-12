import { useState, useEffect } from "react";
import { getFromDatabase, saveToDatabase } from "../database";
import uuid from "uuid";

const useChats = userId => {
  const [currentChat, setCurrentChat] = useState(null);
  const [myActiveChats, setMyActiveChats] = useState([]);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  useEffect(() => {
    getFromDatabase(`/${userId}/chats`, res => {
      console.log(res);
      setMyActiveChats(Object.keys(res));
    });
    getFromDatabase(`/chats/${currentChat}/messages`, res => {
      setCurrentChatMessages(Object.values(res));
    });
  }, [currentChat, userId]);
  const sendMessage = (chatName, body) => {
    const messageId = uuid.v4();
    saveToDatabase(`chats/${chatName}/messages/${messageId}`, {
      body,
      sender: userId,
      created: new Date().toISOString()
    });
  };
  const createChat = (recipient, chatName) => {
    const fullChatName = `${chatName}--${uuid.v4()}`;
    saveToDatabase(`/${recipient}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/${userId}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/chats/${fullChatName}/messages`, {});
    setCurrentChat(fullChatName);
  };

  return [
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    currentChatMessages,
    setCurrentChat
  ];
};

export default useChats;
