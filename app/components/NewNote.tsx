import styles from './NewNote.css';
import  type {LinksFunction} from "@remix-run/node";
import {Form} from "@remix-run/react";

export default function NewNote() {
  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </Form>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];
