import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
  console.log("running initdb")
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  })};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jate = await openDB('jate_db', 1);

  const tx = jate.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');
  
  const request = store.put({content});
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jate = await openDB('jate_db', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jate.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);

  // Create a connection to the database database and version we want to use.
  const contactDb = await openDB('jate_db', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction('jate_db', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .delete() method to get all data in the database.
  const request = store.delete(id);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// initdb();
