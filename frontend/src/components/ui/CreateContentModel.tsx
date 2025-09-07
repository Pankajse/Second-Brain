import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import useOnClickOutside from "../../hooks/useonClickOutside";
import axios from "axios";
import type { ContentType } from "./ContentCard";

type PostContent = Omit<ContentType, "id" | "timeStamp" | "isDarkMode">;

const CreateContentModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const types: string[] = ["Image", "Video", "Link", "Tweet"];
  const [content, setContent] = useState({
    title: "",
    link: "",
    tags: [""],
    type: "",
  });
  const [tagString, setTagString] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (isOpen) {
      resetForm();
      setIsOpen(false);
    }
  });

  const resetForm = () => {
    setContent({
      title: "",
      link: "",
      tags: [""],
      type: "",
    });
    setTagString("");
  };

  const postContent = async (content: PostContent) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/content`,
      content,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      resetForm();
      return response.data.content;
    } else {
      throw new Error(response.data);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2500);
    }
  }, [mutation.isSuccess]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* modal content */}
          <div
            ref={ref}
            className="relative z-10 w-[95%] max-w-lg rounded-2xl bg-white dark:bg-slate-900 dark:text-slate-100 shadow-2xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              Add New Content
            </h2>

            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={content.title}
              className="mt-1 mb-3 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setContent((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <label htmlFor="link" className="font-medium">
              Enter Link
            </label>
            <input
              id="link"
              type="text"
              value={content.link}
              className="mt-1 mb-3 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setContent((prev) => ({ ...prev, link: e.target.value }))
              }
            />

            <label htmlFor="tags" className="font-medium">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tagString}
              placeholder="politics, development"
              className="mt-1 mb-3 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => {
                setTagString(e.target.value);
                const tagsArray = e.target.value.split(",").map((t) => t.trim());
                setContent((prev) => ({ ...prev, tags: tagsArray }));
              }}
            />

            <label className="font-medium">Select Type</label>
            <div className="mt-2 mb-4 grid grid-cols-4 gap-3">
              {types.map((type, i) => (
                <button
                  key={i}
                  type="button"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    content.type === type
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                  onClick={() =>
                    setContent((prev) => ({ ...prev, type: type }))
                  }
                >
                  {type}
                </button>
              ))}
            </div>

            {mutation.isError && (
              <p className="text-red-600 mb-2">Error adding content</p>
            )}
            {showMsg && (
              <p className="text-green-600 mb-2">Content added successfully!</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="secondary"
                size="fit"
                text="Cancel"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
              />
              <Button
                variant="primary"
                size="fit"
                disabled={mutation.isPending}
                text={mutation.isPending ? "Adding..." : "Add Content"}
                startIcon={<PlusIcon />}
                onClick={() => {
                  mutation.mutate(content);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModal;
