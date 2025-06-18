const container = document.getElementById('noteContainer');
const addNoteBtn = document.getElementById('addNoteBtn');

addNoteBtn.addEventListener('click', () => {
  const note = document.createElement('textarea');
  note.classList.add('note');
  note.placeholder = 'Type something...';

  // Double-click to delete note
  note.addEventListener('dblclick', () => {
    if (confirm('Delete this note?')) {
      note.remove();
    }
  });

  container.appendChild(note);
});
