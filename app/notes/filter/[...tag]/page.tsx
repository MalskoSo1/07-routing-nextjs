import NotesClient from "../../Notes.client";

interface NotesFilterProps {
  params: Promise<{ tag?: string[] }>;
}

const NotesFilter = async ({ params }: NotesFilterProps) => {
  const { tag } = await params;
  const currentTag = tag?.[0];

  const tagParam =
    currentTag && currentTag.toLowerCase() !== "all"
      ? currentTag.charAt(0).toUpperCase() + currentTag.slice(1).toLowerCase()
      : undefined;

  return <NotesClient currentTag={tagParam} />;
};

export default NotesFilter;
