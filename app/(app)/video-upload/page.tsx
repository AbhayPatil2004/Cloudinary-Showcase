// "use client"
// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// function videoUpload() {

//     const [file , setFile] = useState<File|null>(null)
//     const [ title , setTitle ] = useState("")
//     const [ description , setDescription ] = useState("")
//     const [ isuploading , setIsuploading ] = useState(false)

//     const route = useRouter()

//     const MAX_FILE_SIZE = 70 * 1024 * 1024

//     const handelSubmit = async ( e:React.FormEvent ) => {
//         e.preventDefault()
//         if( !file) return ;

//         if( file.size > MAX_FILE_SIZE ){
//             alert("File Size too Large")
//             return 
//         }

//         setIsuploading(true)
//         const formData = new FormData()
//         formData.append("file" , file)
//         formData.append("title" , title)
//         formData.append("description" , description)
//         formData.append("originalSize" , file.size.toString())  

//         try{
//             await axios.post("/api/video-upload",formData)
//         }
//         catch(error){
//             console.log(error)
//         }
//         finally{
//             setIsuploading(false)
//         }

//     }

//     return (
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
//           <form onSubmit={handelSubmit} className="space-y-4">
//             <div>
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="textarea textarea-bordered w-full"
//               />
//             </div>
//             <div>
//               <label className="label">
//                 <span className="label-text">Video File</span>
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                 className="file-input file-input-bordered w-full"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={isuploading}
//             >
//               {isuploading ? "Uploading..." : "Upload Video"}
//             </button>
//           </form>
//         </div>
//     )
// }

// export default videoUpload


"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isuploading, setIsuploading] = useState(false)

  const route = useRouter()
  const MAX_FILE_SIZE = 70 * 1024 * 1024

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      alert("File Size too Large")
      return
    }

    setIsuploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("originalSize", file.size.toString())

    try {
      await axios.post("/api/video-upload", formData)
    } catch (error) {
      console.log(error)
    } finally {
      setIsuploading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Upload Video
      </h1>

      <form
        onSubmit={handelSubmit}
        className="bg-gray-800 shadow-lg rounded-xl p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-600 bg-gray-900 text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block w-full rounded-lg border border-gray-600 bg-gray-900 text-white p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Video File */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Video File
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-200
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-600 file:text-white
                       hover:file:bg-blue-700
                       cursor-pointer border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isuploading}
        >
          {isuploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  )
}

export default VideoUpload
