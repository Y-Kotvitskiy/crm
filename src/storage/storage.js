class IDB {
  db;
  name;
  openRequest;
  stores = [];

  handlers = {
    error: (err) => {
      console.warn(`db error`);
    },
    success: (ev) => {
      console.log(`db success`);
      this.db = ev.target.result;
    },
    upgradeneeded: (ev) => {
      const db = ev.target.result;
      this.db = db;
      console.log(`db upgrade`, db, db.CreateObjectStore);
      const objectStore = db.CreateObjectStore('modules',{
        keyPath: `id`
      });
    },
  };
  constructor (name) {
    console.log('init db')
    this.name = name;
    const openRequest = indexedDB.open(name);
    this.openRequest = openRequest;
    for (const [event, handler] of Object.entries(this.handlers)) {
      openRequest.addEventListener(event, handler);
      console.log(`${event}: ${handler}`);
    }
  };
}

export default IDB;
