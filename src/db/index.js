import { openDB } from 'idb';

const dbPromise = openDB('LOCAL_DB', 1, {
  upgrade(db) {
    const store = db.createObjectStore('pokemons', { keyPath: 'id', autoIncrement: true, });
    store.createIndex('id', 'name');
  },
});

export const addDB = (data) => async () => {
  dbPromise.then((db) => {
    var tx = db.transaction('pokemons', 'readwrite');
    var store = tx.objectStore('pokemons');
    store.put(data)
    return tx.complete;
  });
}

export  const getAllDB = (successCB) => async () => { 
  dbPromise.then((db) => {
    let tx = db.transaction('pokemons', 'readonly')
    let store = tx.objectStore('pokemons')
    return store.getAll()
  }).then((res) => {
    return successCB(res)
  })
}

export  const getDetailDB = (data) => async () => { 
  dbPromise.then((db) => {
    let tx = db.transaction('pokemons', 'readonly')
    let store = tx.objectStore('pokemons')
    return store.get(data)
  }).then((res) => {
    console.log(res);
  })
}

export const deleteDB = (id, successCB) => () => { 
  dbPromise.then((db) => {
    let tx = db.transaction('pokemons', 'readwrite')
    let store = tx.objectStore('pokemons')
    store.delete(id)
    return store.getAll()
  }).then((res) => {
    return successCB(res)
  })
}
