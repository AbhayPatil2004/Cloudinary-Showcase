import React, { useState, useEffect, useCallback } from 'react'
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary"
import { Download, Clock, FileDown, FileUp } from "lucide-react";
import dayjs from 'dayjs';
import realtiveTime from "dayjs/plugin/relativeTime"
import { filesize } from "filesize"
import { Video } from '../generated/prisma';

dayjs.extend(realtiveTime)

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video"
    })
  }, [])

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,

    })
  }, [])

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]

    })
  }, [])

  const formatSize = useCallback((size: number) => {
    return filesize(size)
  }, [])

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.OriginalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    // <div
    //   className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   <figure className="aspect-video relative">
    //     {isHovered ? (
    //       previewError ? (
    //         <div className="w-full h-full flex items-center justify-center bg-gray-200">
    //           <p className="text-red-500">Preview not available</p>
    //         </div>
    //       ) : (
    //         <video
    //           src={getPreviewVideoUrl(video.publicId)}
    //           autoPlay
    //           muted
    //           loop
    //           className="w-full h-full object-cover"
    //           onError={handlePreviewError}
    //         />
    //       )
    //     ) : (
    //       <img
    //         src={getThumbnailUrl(video.publicId)}
    //         alt={video.title}
    //         className="w-full h-full object-cover"
    //       />
    //     )}
    //     <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
    //       <Clock size={16} className="mr-1" />
    //       {formatDuration(Number(video.duration))}
    //     </div>
    //   </figure>
    //   <div className="card-body p-4">
    //     <h2 className="card-title text-lg font-bold">{video.title}</h2>
    //     <p className="text-sm text-base-content opacity-70 mb-4">
    //       {video.description}
    //     </p>
    //     <p className="text-sm text-base-content opacity-70 mb-4">
    //       Uploaded {dayjs(video.createdAt).fromNow()}
    //     </p>
    //     <div className="grid grid-cols-2 gap-4 text-sm">
    //       <div className="flex items-center">
    //         <FileUp size={18} className="mr-2 text-primary" />
    //         <div>
    //           <div className="font-semibold">Original</div>
    //           <div>{formatSize(Number(video.OriginalSize))}</div>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <FileDown size={18} className="mr-2 text-secondary" />
    //         <div>
    //           <div className="font-semibold">Compressed</div>
    //           <div>{formatSize(Number(video.compressedSize))}</div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex justify-between items-center mt-4">
    //       <div className="text-sm font-semibold">
    //         Compression:{" "}
    //         <span className="text-accent">{compressionPercentage}%</span>
    //       </div>
    //       <button
    //         className="btn btn-primary btn-sm"
    //         onClick={() =>
    //           onDownload(getFullVideoUrl(video.publicId), video.title)
    //         }
    //       >
    //         <Download size={16} />
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div
      style={{
        backgroundColor: "#ffffff", // bg-base-100
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%", // 16:9 aspect ratio
          overflow: "hidden",
        }}
      >
        {isHovered ? (
          previewError ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e5e7eb", // gray-200
              }}
            >
              <p style={{ color: "#ef4444" /* red-500 */ }}>Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted
              loop
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            backgroundColor: "rgba(255,255,255,0.7)",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Clock size={16} style={{ marginRight: "0.25rem" }} />
          {formatDuration(Number(video.duration))}
        </div>
      </figure>

      <div style={{ padding: "1rem" }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          {video.title}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "#374151", opacity: 0.7, marginBottom: "0.5rem" }}>
          {video.description}
        </p>
        <p style={{ fontSize: "0.875rem", color: "#374151", opacity: 0.7, marginBottom: "0.5rem" }}>
          Uploaded {dayjs(video.createdAt).fromNow()}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FileUp size={18} style={{ marginRight: "0.5rem", color: "#3b82f6" }} />
            <div>
              <div style={{ fontWeight: 600 }}>Original</div>
              <div>{formatSize(Number(video.OriginalSize))}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FileDown size={18} style={{ marginRight: "0.5rem", color: "#a855f7" }} />
            <div>
              <div style={{ fontWeight: 600 }}>Compressed</div>
              <div>{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            Compression:{" "}
            <span style={{ color: "#f43f5e" /* text-accent */ }}>{compressionPercentage}%</span>
          </div>
          <button
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              padding: "0.25rem 0.75rem",
              fontSize: "0.875rem",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
            onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title)}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>

  );
}

export default VideoCard