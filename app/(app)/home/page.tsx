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

    <div
      style={{
        maxWidth: "1200px", 
        margin: "0 auto",
        padding: "16px",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          marginBottom: "1rem", 
        }}
      >
        Videos
      </h1>

      {videos.length === 0 ? (
        <div
          style={{
            textAlign: "center", 
            fontSize: "1.125rem", 
            color: "#6B7280", 
          }}
        >
          No videos available
        </div>
      ) : (
        <div
          style={{
            display: "grid", 
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))", // grid-cols-1
            gap: "1.5rem", 
          }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={{
                ...video,
                duration: String(video.duration),
              }}
              onDownload={handelDownload}
            />
          ))}
        </div>
      )}
    </div>

  )
}
