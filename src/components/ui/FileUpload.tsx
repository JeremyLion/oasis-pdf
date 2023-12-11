"use client";
import { uploadToS3 } from "@/lib/db/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

type Props = {};

const FileUpload = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("accepted files", acceptedFiles);
			const file = acceptedFiles[0]
			if (file.size > 10 * 1024 * 1024) {
				alert("Please upload a smaller file")
				return
			}

			try {
				const data = await uploadToS3(file)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-green-50 py-8 flex flex-col items-center",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-8 h-8 text-purple-700" />
          <p className="mt-2 text-sm text-slate-400">Drop Pdf Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
