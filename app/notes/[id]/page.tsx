import { fetchNoteById } from "../../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: PostDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </main>
  );
};

export default NoteDetails;
