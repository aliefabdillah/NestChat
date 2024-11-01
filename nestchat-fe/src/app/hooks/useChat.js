import { useEffect, useState } from 'react';
 import io from 'socket.io-client';

 const useChat = (chatId) => {
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState('');
   const [socket, setSocket] = useState(null);

   useEffect(() => {
     const newSocket = io(process.env.SOCKET_URL);
     setSocket(newSocket);

     newSocket.emit('joinChat', chatId);

     newSocket.on('receiveMessage', (newChat) => {
       setMessages(newChat.messages);
     });

     return () => newSocket.close();
   }, [chatId]);

   const sendMessage = (userId, content) => {
     socket.emit('sendMessage', { chatId, userId, content });
     setMessage('');
   };

   return {
     messages,
     message,
     setMessage,
     sendMessage,
   };
 };

 export default useChat;