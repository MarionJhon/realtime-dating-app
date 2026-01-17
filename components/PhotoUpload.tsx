"use client";
import { uploadProfilePhoto } from "@/lib/action/profile";
import { CameraIcon } from "lucide-react";
import { useRef, useState } from "react";

export const PhotoUpload = ({
  onPhotoUploaded,
}: {
  onPhotoUploaded: (url: string) => void;
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const result = await uploadProfilePhoto(file);
      if (result.success && result.url) {
        onPhotoUploaded(result.url);
        setError(null);
      } else {
        setError(result.error ?? "Failed to upload photo.");
      }
    } catch (error) {
      setError("Failed to change photo");
    } finally {
      setUploading(false);
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="absolute bottom-0 right-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
        title="Change Photo"
      >
        {uploading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <CameraIcon className="h-4 w-4 text-white" />
        )}
      </button>
    </div>
  );
};
