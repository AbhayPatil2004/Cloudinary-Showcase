"use client"
import React, { useCallback } from "react"
import { useState, useEffect } from "react"
import VideoCard from "@/app/components/VideoCard"
import { video } from "@prisma/client"
import axios from "axios"

export default function Home() {

  const [videos, setVideos] = useState<video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos")
      if (Array.isArray(response.data)) {
        console.log(response)
        setVideos(response.data)
      }
      else {
        throw new Error("Unexpected response format");
      }
    }
    catch (error) {
      console.log("Error in fetching Videos")
      setError("Failed to fetch videos")
    }
    finally {
      setLoading(false)
    }

  }, [])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  const handelDownload = useCallback((url: string, title: string) => {
    () => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (

   <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          {videos.length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No videos available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={{ ...video, duration: String(video.duration) }}
                        onDownload={handelDownload}
                    />
                ))
              }
            </div>
          )}
        </div>

  )
}
