let addBtn = document.getElementById('add');

let notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  let note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-pencil-alt"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="content ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

  let editBtn = note.querySelector('.edit');
  let deleteBtn = note.querySelector('.delete');
  let content = note.querySelector('.content');
  let textArea = note.querySelector('textarea');

  textArea.value = text;
  content.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    content.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    let { value } = e.target;

    content.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  let notesText = document.querySelectorAll('textarea');

  let notes = [];

  notesText.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}
