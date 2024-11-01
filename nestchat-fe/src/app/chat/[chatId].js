import { useRouter } from "next/router";
import ChatDetails from "../components/ChatDetails";

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const userId = 'USER_ID'; // Replace with the actual user ID from authentication

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return <ChatDetails chatId={chatId} userId={userId} />;
}