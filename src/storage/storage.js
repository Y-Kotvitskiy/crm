import { object } from "zod";

class IDB {
  db;
  name;
  modulesCollection;
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
      this.modulesCollection.forEach((module) => {
        const objectStore = db.createObjectStore(module, {
          keyPath: `id`,
        });
      });
    },
  };
  constructor(name, modulesCollection) {
    Object.assign(this, { name, modulesCollection });
    console.log(`this`, this);
    const openRequest = indexedDB.open(name);
    this.openRequest = openRequest;
    for (const [event, handler] of Object.entries(this.handlers)) {
      openRequest.addEventListener(event, handler);
    }
  }
}

export default IDB;
