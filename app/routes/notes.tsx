import React from 'react';
import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import type {ActionFunctionArgs} from "@remix-run/node";

export default function Notes() {
  return (
    <main>
      <NewNote/>
    </main>
  );
}

export const action = async ({params, request,}: ActionFunctionArgs) => {

  const formData = await request.formData();
  

}

export function links() {
  return [...newNoteLinks()];
}

