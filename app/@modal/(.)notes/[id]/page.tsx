"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <p className={"text-loading text-loading-modal"}>
        Loading, please wait...
      </p>
    );
  }

  if (error || !data) {
    throw error;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <div onClick={handleBackdropClick} className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.backBtn} onClick={handleClose}>
          X
        </button>
        <div className={css.container}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
