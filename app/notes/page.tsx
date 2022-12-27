import Link from "next/link";
import CreateNote from "./CreateNote";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

async function NotePage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      {notes?.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content } = note || {};
  return (
    <div>
      <Link
        href={`/notes/${id}`}
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {content}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default NotePage;
