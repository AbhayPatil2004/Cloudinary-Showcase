// "use client"

// import { useEffect, useState, useRef } from 'react'
// import { CldImage } from 'next-cloudinary'
// import React from 'react'

// const socialFormats = {
//   "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
//   "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
//   "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//   "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// };

// type SocialFormat = keyof typeof socialFormats;

// function socialShare() {

//   const [uploadedImage, setUploadImage] = useState<string | null>(null)
//   const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
//   const [isupload, setIsupload] = useState(false)
//   const [isTransforming, setisTransforming] = useState(false);
//   const imgRef = useRef<HTMLImageElement>(null)

//   useEffect(() => {
//     if (uploadedImage) {
//       setisTransforming(true)
//     }
//   }, [selectedFormat, uploadedImage])


//   const handelFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

//     const file = event.target.files?.[0];
//     if (!file) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("api/image-upload", {
//         method: "POST",
//         body: formData
//       })

//       if (!response.ok) {
//         throw new Error("Failed to upload image");
//       }

//       const data = await response.json()
//       setUploadImage(data.publicId)

//     }
//     catch (error) {
//       console.log("Failed to upload image")
//       alert("Failed to upload Image")
//     }
//     finally {
//       setIsupload(false)
//     }

//   }

//   const handelDownload = () => {
//     if (!imgRef.current) return;

//     fetch(imgRef.current.src)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const url = window.URL.createObjectURL(blob)
//         const link = document.createElement("a")
//         link.href = url;
//         link.download = `${selectedFormat
//           .replace(/\s+/g, "_")
//           .toLowerCase()}.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(link);
//       })
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             Social Media Image Creator
//           </h1>

//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title mb-4">Upload an Image</h2>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Choose an image file</span>
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handelFileUpload}
//                   className="file-input file-input-bordered file-input-primary w-full"
//                 />
//               </div>

//               {isupload && (
//                 <div className="mt-4">
//                   <progress className="progress progress-primary w-full"></progress>
//                 </div>
//               )}

//               {uploadedImage && (
//                 <div className="mt-6">
//                   <h2 className="card-title mb-4">Select Social Media Format</h2>
//                   <div className="form-control">
//                     <select
//                       className="select select-bordered w-full"
//                       value={selectedFormat}
//                       onChange={(e) =>
//                         setSelectedFormat(e.target.value as SocialFormat)
//                       }
//                     >
//                       {Object.keys(socialFormats).map((format) => (
//                         <option key={format} value={format}>
//                           {format}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mt-6 relative">
//                     <h3 className="text-lg font-semibold mb-2">Preview:</h3>
//                     <div className="flex justify-center">
//                       {isTransforming && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
//                           <span className="loading loading-spinner loading-lg"></span>
//                         </div>
//                       )}
//                       <CldImage
//                         width={socialFormats[selectedFormat].width}
//                         height={socialFormats[selectedFormat].height}
//                         src={uploadedImage}
//                         sizes="100vw"
//                         alt="transformed image"
//                         crop="fill"
//                         aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                         gravity='auto'
//                         ref={imgRef}
//                         onLoad={() => setisTransforming(false)}
//                         />
//                     </div>
//                   </div>

//                   <div className="card-actions justify-end mt-6">
//                     <button className="btn btn-primary" onClick={handelDownload}>
//                       Download for {selectedFormat}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//   )
// }

// export default socialShare

"use client"

import { useEffect, useState, useRef } from 'react'
import { CldImage } from 'next-cloudinary'
import React from 'react'

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

function socialShare() {
  const [uploadedImage, setUploadImage] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isupload, setIsupload] = useState(false)
  const [isTransforming, setisTransforming] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (uploadedImage) {
      setisTransforming(true)
    }
  }, [selectedFormat, uploadedImage])


  const handelFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("api/image-upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json()
      setUploadImage(data.publicId)

    }
    catch (error) {
      console.log("Failed to upload image")
      alert("Failed to upload Image")
    }
    finally {
      setIsupload(false)
    }
  }

  const handelDownload = () => {
    if (!imgRef.current) return;

    fetch(imgRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url;
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl ">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Social Media Image Creator
      </h1>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Upload an Image</h2>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Choose an image file
          </label>
          <input
            type="file"
            onChange={handelFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div> */}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Choose an image file
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handelFileUpload}
              className="block w-full text-sm text-gray-200
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-600 file:text-white
                 hover:file:bg-blue-700
                 cursor-pointer border border-gray-600 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        {isupload && (
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-blue-500 animate-pulse w-1/2"></div>
            </div>
          </div>
        )}

        {uploadedImage && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Select Social Media Format</h2>
            <div>
              <select
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedFormat}
                onChange={(e) =>
                  setSelectedFormat(e.target.value as SocialFormat)
                }
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 relative">
              <h3 className="text-lg font-semibold mb-2">Preview:</h3>
              <div className="flex justify-center">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <CldImage
                  width={socialFormats[selectedFormat].width}
                  height={socialFormats[selectedFormat].height}
                  src={uploadedImage}
                  sizes="100vw"
                  alt="transformed image"
                  crop="fill"
                  aspectRatio={socialFormats[selectedFormat].aspectRatio}
                  gravity='auto'
                  ref={imgRef}
                  onLoad={() => setisTransforming(false)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handelDownload}
              >
                Download for {selectedFormat}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default socialShare
