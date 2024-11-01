'use client'
import { useParams, useRouter } from 'next/navigation';
import ChatWindow from '../../components/ChatWindow';
import { useEffect, useState } from 'react';
import { decodeToken } from '@/app/utils/decodeToken';

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUserId = decodeToken(token);
      setUserId(decodedUserId);
    }
  }, []);

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return <ChatWindow chatId={chatId} userId={userId} />;
}