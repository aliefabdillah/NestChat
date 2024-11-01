'use client'
import { useEffect, useState } from 'react';
import useChat from '../hooks/useChat';
import Notification from './Notification';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';

export default function ChatDetails({ chatId, userId, files }) {
  const [notification, setNotification] = useState(null);
  const { messages, message, setMessage, sendMessage } = useChat(chatId, setNotification);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(userId, message);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chat</h2>
      <div>
        <ul className="mb-5">
          {messages.map((msg, index) => (
            <li key={index} className="mb-2 p-2 border rounded">
              <strong>{msg.sender.username}</strong>: {msg.content} <br />
              <span className="text-gray-500 text-sm">{new Date(msg.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
        <FileUpload chatId={chatId} />
        <div className="mt-4">
          {files.map(file => (
            <FileDownload key={file.id} chatId={chatId} file={file} />
          ))}
        </div>
      </div>
      <Notification message={notification} />
    </div>
  );
}