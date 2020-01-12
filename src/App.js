import React from "react";
import Connect from "./components/Connect";
import ActiveChats from "./components/ActiveChats";
import CreateChat from "./components/CreateChat";
import ChatWindow from "./components/ChatWindow";
import useAuth from "./hooks/useAuth";
import useChats from "./hooks/useChats";

const App = () => {
  const [userId, users, connect] = useAuth();
  const [
    myActiveChats,
    setCurrentChat,
    createChat,
    sendMessage,
    currentChat,
    currentChatMessages
  ] = useChats(userId);
  return (
    <div className="App">
      {!userId ? (
        <Connect connect={connect} />
      ) : (
        <>
          <ActiveChats
            setCurrentChat={setCurrentChat}
            myActiveChats={myActiveChats}
          />

          <CreateChat
            createChat={createChat}
            users={users.filter(user => user !== userId)}
          />
          {currentChat && (
            <ChatWindow
              sendMessage={sendMessage}
              currentChat={currentChat}
              messages={currentChatMessages}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
