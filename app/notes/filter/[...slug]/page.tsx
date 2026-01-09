import NotesClient from "./Notes.client";

interface NotesFilterProps {
  params: Promise<{ slug?: string[] }>;
}

const NotesFilter = async ({ params }: NotesFilterProps) => {
  const { slug } = await params;
  const currentTag = slug?.[0];

  const tagParam =
    currentTag && currentTag.toLowerCase() !== "all"
      ? currentTag.charAt(0).toUpperCase() + currentTag.slice(1).toLowerCase()
      : undefined;

  return <NotesClient currentTag={tagParam} />;
};

export default NotesFilter;
