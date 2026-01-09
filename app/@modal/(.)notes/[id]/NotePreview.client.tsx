"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  if (isLoading)
    return <p className="text-loading text-loading-modal">Loading...</p>;
  if (error || !data) throw error;

  return (
    <div onClick={handleBackdropClick} className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.container}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button className={css.backBtn} onClick={() => router.back()}>
              X
            </button>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
