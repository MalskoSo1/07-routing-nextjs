import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  const debouncedSearch = "";
  const page = 1;
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", debouncedSearch, page, currentTag],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage, currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient currentTag={tagParam} />
    </HydrationBoundary>
  );
};

export default NotesFilter;
