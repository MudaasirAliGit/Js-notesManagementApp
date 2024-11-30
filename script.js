// DOM Elements
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteDescription = document.getElementById('noteDescription');
const notesContainer = document.getElementById('notesContainer');

// Fetch Notes from Local Storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render Notes Function
function renderNotes() {
  notesContainer.innerHTML = '';

  if (notes.length === 0) {
    notesContainer.innerHTML = '<p style="color: #666; font-size: 1.2rem;">No notes yet! Add a note above.</p>';
    return;
  }

  notes.forEach((note, index) => {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');

    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    notesContainer.appendChild(noteCard);
  });
}

// Add Note Function
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const description = noteDescription.value.trim();

  if (!title || !description) {
    alert('Both title and description are required!');
    return;
  }

  const newNote = { title, description };
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));

  renderNotes();
  noteForm.reset();
});

// Delete Note Function
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

// Initial Render
renderNotes();
