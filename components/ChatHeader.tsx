import { UserProfile } from "@/app/profile/page";
import { calculateAge } from "@/lib/helpers/calculate-age";
import { ChevronLeft, Video } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  user: UserProfile;
  onVideoCall?: () => void;
}
const ChatHeader = ({ user, onVideoCall }: ChatHeaderProps) => {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:boder-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.full_name}, {calculateAge(user.birthdate)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onVideoCall}
            className="p-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            title="Start Video Call"
          >
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
