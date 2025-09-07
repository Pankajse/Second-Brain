import axios from "axios";
import DeleteIcon from "../icons/DeleteIcon";
import DocumentIcon from "../icons/DocumentIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tweet } from "react-tweet";

export interface ContentType {
  title: string;
  link: string;
  type: string;
  tags: string[];
  id: string;
  timeStamp: string;
  isDarkMode: boolean;
}

const ContentCard = ({
  title,
  link,
  type,
  tags,
  id,
  timeStamp,
  isDarkMode,
}: ContentType) => {
  const deleteHandler = async (id: string) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/content`,
      {
        data: { contentId: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.msg;
    } else {
      throw new Error(response.data?.error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });

  return (
    <div className="flex flex-col gap-4 my-3 p-4 sm:p-6 rounded-2xl shadow-md bg-white dark:bg-slate-800 dark:text-slate-100 break-inside-avoid">
      {/* Header */}
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-2">
          <DocumentIcon />
          <h5 className="font-semibold text-lg sm:text-xl">{title}</h5>
        </div>
        <div
          className="hover:cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={() => mutation.mutate(id)}
        >
          <DeleteIcon />
        </div>
      </div>

      {/* Content Preview */}
      {type === "Video" && (
        <iframe
          className="w-full h-60 sm:h-72 rounded-lg"
          src={`https://www.youtube.com/embed/${link}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {type === "Tweet" && (
        <div
          className="w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
          data-theme={isDarkMode ? "dark" : "light"}
        >
          <Tweet id={link} />
        </div>
      )}

      {type === "Image" && (
        <img
          className="w-full h-auto max-h-72 object-cover rounded-lg"
          src={link}
          alt={title}
        />
      )}

      {type === "Link" && (
        <a
          className="text-purple-600 dark:text-purple-400 underline break-words"
          target="_blank"
          href={link}
        >
          {link}
        </a>
      )}

      {/* Footer */}
      <div className="w-full flex flex-col gap-2">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300 text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Timestamp */}
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Added on {timeStamp}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;


