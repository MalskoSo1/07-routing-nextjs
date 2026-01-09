import { fetchNotes } from "../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const NotesPage = async () => {
  const queryClient = new QueryClient();

  const debouncedSearch = "";
  const page = 1;
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </main>
  );
};

export default NotesPage;
