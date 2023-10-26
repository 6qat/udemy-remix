import React from 'react';
import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NotesList, {links as noteListLinks} from "~/components/NoteList";
import type {ActionFunctionArgs} from "@remix-run/node";
import {json, redirect} from "@remix-run/node";
import {getStoredNotes, storeNotes} from "~/data/notes";
import {useLoaderData} from "@remix-run/react";


export type NotesType = {
  id: Date;
  title: string;
  content: string;
}

export async function loader() {
  let notes = await getStoredNotes();
  return json(notes);
}

export default function Notes() {

  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote/>
      <NotesList notes={data}/>
    </main>
  );

}

export async function action({params, request,}: ActionFunctionArgs) {

  const formData: FormData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.toString().trim().length < 5) {
    return json({
      message: 'Invalid title - must be at least 5 characters long',
    });
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // Simulate delay when inserting note into database
  await new Promise(
    (resolve, reject) => setTimeout(
      () => {
        resolve(null)
      },
      1000
    )
  );

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

