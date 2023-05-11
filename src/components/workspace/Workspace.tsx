import { NoteEditor } from '../noteEditor/NoteEditor';

export const Workspace = () => {
  return (
    <div className="bg-gray-100 md:col-span-2 rounded-md h-[86vh] px-6">
      <NoteEditor />
    </div>
  );
};

// const [notesList, setNoteList] = useState<INote[] | null>(null);
// const [noteItem, setNoteItem] = useState<INote | null>(null);

// const context = useContext(NotesContext);

// useEffect(() => {
//   if (context) {
//     context.setIsActiveNote(noteItem);
//   }
// }, [noteItem, context]);

// useEffect(() => {
//   if (context && context.notes) {
//     const { notes } = context;
//     setNoteList(notes);
//   }
// }, [context]);

// useEffect(() => {
//   if (context && context.notes) {
//     const { notes } = context;
//     setNoteList(notes);
//   }
// }, [context]);

// useEffect(() => {
//   if (notesList) {
//     const item = notesList.find((note) => note.id === idNote);
//     if (item) {
//       setNoteItem(item);
//     }
//   }
// }, [notesList, idNote]);
