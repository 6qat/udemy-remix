import React from 'react';
import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import type {ActionFunctionArgs} from "@remix-run/node";
import {getStoredNotes, storeNotes} from "~/data/notes";
import {redirect} from "@remix-run/node";

export default function Notes() {
  return (
    <main>
      <NewNote/>
    </main>
  );
}

export async function action({params, request,}: ActionFunctionArgs) {

  const formData: FormData = await request.formData();
  const noteData = Object.fromEntries(formData);
  console.log(noteData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}

