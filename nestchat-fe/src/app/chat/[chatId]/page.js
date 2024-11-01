'use client'
import { useParams, useRouter } from 'next/navigation';
import ChatWindow from '../../components/ChatWindow';

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = useParams();
  const userId = 'USER_ID'; // Replace with the actual user ID from authentication
  
  if (!chatId) {
    return <div>Loading...</div>;
  }

  return <ChatWindow chatId={chatId} userId={userId} />;
}