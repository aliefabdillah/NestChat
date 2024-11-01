'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getChats } from '../services/api';

export default function ChatListPage() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getChats(token);
          setChats(data);
        } else {
          setError('No token found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchChats();
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.participants.some(participant =>
      participant.username.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Chats</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-5"
        placeholder="Search chats..."
      />
      {filteredChats.length > 0 ? (
        <ul>
          {filteredChats.map(chat => (
            <li
              key={chat.id}
              className="mb-2 p-2 border rounded cursor-pointer"
              onClick={() => handleChatClick(chat.id)}
            >
              {chat.participants.map(participant => participant.username).join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
}