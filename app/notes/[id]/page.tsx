async function getNotes(noteID: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteID}`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data;
}

async function NotePage({ params }: any) {
  const note = await getNotes(params.id);
  return (
    <div>
      <h1 className="">{note.title}</h1>
      <h5>{note.content}</h5>
    </div>
  );
}

export default NotePage;
