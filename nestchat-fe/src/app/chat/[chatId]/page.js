'use client'
import { useParams, useRouter } from 'next/navigation';
import ChatWindow from '../../components/ChatWindow';
import { useEffect, useState } from 'react';
import { decodeToken } from '@/app/utils/decodeToken';
import { getFiles } from '@/app/services/api';

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = useParams();
  const [userId, setUserId] = useState(null);
  const [files, setFiles] = useState([]);

  const handleGetFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const files = await getFiles(token, chatId)
      console.log(files)
      setFiles(files)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUserId = decodeToken(token);
      setUserId(decodedUserId);
    }
    handleGetFiles()
  }, []);

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return <ChatWindow chatId={chatId} userId={userId} files={files} />;
}