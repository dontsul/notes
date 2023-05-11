const DB_NAME = 'notesDatabase';
const DB_VERSION = 1;
const NOTES_STORE_NAME = 'notesObjectStore';

export const openDatabase = () => {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function (event) {
      reject(new Error('Ошибка при открытии базы данных'));
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore(NOTES_STORE_NAME, { keyPath: 'id' });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
};

function addNote(note) {
  return openDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const transaction = db.transaction([NOTES_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(NOTES_STORE_NAME);
      const request = objectStore.add(note);

      // request.onsuccess = function (event) {
      //   resolve();
      // };
      request.onsuccess = function (event) {
        resolve({ ...note, id: event.target.result });
      };

      request.onerror = function (event) {
        reject(new Error('Ошибка при добавлении заметки'));
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    });
  });
}

function getNotes() {
  return openDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      var transaction = db.transaction([NOTES_STORE_NAME], 'readonly');
      var objectStore = transaction.objectStore(NOTES_STORE_NAME);
      var request = objectStore.getAll();

      request.onsuccess = function (event) {
        resolve(event.target.result);
      };

      request.onerror = function (event) {
        reject(new Error('Ошибка при получении списка заметок'));
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    });
  });
}

function deleteNoteById(id) {
  return openDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      var transaction = db.transaction([NOTES_STORE_NAME], 'readwrite');
      var objectStore = transaction.objectStore(NOTES_STORE_NAME);
      var request = objectStore.delete(id);

      request.onsuccess = function (event) {
        resolve();
      };

      request.onerror = function (event) {
        reject(new Error('Ошибка при удалении заметки'));
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    });
  });
}

function updateNoteById(newNote) {
  return openDatabase().then(function (db) {
    return new Promise(function (resolve, reject) {
      const transaction = db.transaction([NOTES_STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(NOTES_STORE_NAME);
      const request = objectStore.put(newNote);

      request.onsuccess = function (event) {
        resolve({ ...newNote, id: event.target.result });
      };

      request.onerror = function (event) {
        reject(new Error('Ошибка при добавлении заметки'));
      };

      transaction.oncomplete = function (event) {
        db.close();
      };
    });
  });
}
export { addNote, getNotes, deleteNoteById, updateNoteById };
