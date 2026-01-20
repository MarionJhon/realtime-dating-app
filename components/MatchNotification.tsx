import { UserProfile } from "@/app/profile/page";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface MatchNotificationProps {
  match: UserProfile;
  onClose: () => void;
  onStartChat: () => void;
}

const MatchNotification = ({
  match,
  onClose,
  onStartChat,
}: MatchNotificationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [onClose]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }

  function handleStartChat() {
    onStartChat();
    handleClose();
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <img
              src={match.avatar_url}
              alt={match.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                It's a Match 🎉
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close match notification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              You and <span className="font-semibold">{match.full_name}</span>{" "}
              liked each other!
            </p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleStartChat}
                className="flex-1 bg-linear-to-r from-pink-500 to-red-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
              >
                Start Chat
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchNotification;
