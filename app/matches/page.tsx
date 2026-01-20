"use client";

import { useEffect, useState } from "react";
import { getPotentialMatches, likeUser } from "@/lib/action/matches";
import { UserProfile } from "../profile/page";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MatchCard from "@/components/MatchCard";
import MatchButton from "@/components/MatchButton";
import MatchNotification from "@/components/MatchNotification";

const MatchesPage = () => {
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUsers() {
      try {
        const potentialMatchesData = await getPotentialMatches();
        setPotentialMatches(potentialMatchesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const currentPotentialMatch = potentialMatches[currentIndex];

  function handlePass() {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  async function handleLike() {
    if (currentIndex < potentialMatches.length) {
      const likedUser = potentialMatches[currentIndex];

      try {
        const result = await likeUser(likedUser.id);
        if (result.isMatch) {
          setMatchedUser(result.matchedUser!);
          setShowMatchNotification(true);
        }

        setCurrentIndex((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleCloseNotification() {}

  function handleStartChat() {}

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Finding your matches...
          </p>
        </div>
      </div>
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <div className="h-full bg-linear-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-linear-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No more profiles to show
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check back later for new matches, or try adjusting your preferences!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
          >
            Refresh
          </button>
        </div>
          {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-linear-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex-1" />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Discover Matches
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentIndex + 1} of {potentialMatches.length} profiles
            </p>
          </div>
        </header>
        <div className="max-w-md mx-auto">
          <MatchCard user={currentPotentialMatch} />
          <div className="mt-8">
            <MatchButton onLike={handleLike} onPass={handlePass} />
          </div>
        </div>
        {showMatchNotification && matchedUser && (
          <MatchNotification
            match={matchedUser}
            onClose={handleCloseNotification}
            onStartChat={handleStartChat}
          />
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
