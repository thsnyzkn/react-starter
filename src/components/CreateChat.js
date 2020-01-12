import React, { useState } from "react";

const CreateChat = ({ createChat, users }) => {
  const [chatName, setChatName] = useState("");
  const [recipient, setRecipient] = useState(users[0]);

  return (
    <div className="panel">
      <h3>Create a Chat </h3>
      <p>Enter a name and select a recipient for your chat:</p>
      <input
        onChange={e => setChatName(e.target.value)}
        value={chatName}
        placeholder="Enter name for your chat!"
      />
      <select onChange={e => setRecipient(e.target.value)}>
        {users.map((user, i) => (
          <option value={user} key={i}>
            {user}
          </option>
        ))}
      </select>
      <p>
        Create chat with name {chatName} and recipient: {recipient} ?
      </p>
      <button
        onClick={() => createChat(recipient, chatName)}
        disabled={!chatName || !recipient}
      ></button>
    </div>
  );
};

export default CreateChat;
