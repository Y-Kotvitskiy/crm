const moduleUpdatedStore = `Module_updated`;

class IDB {
  conn;
  name;
  modulesCollection;
  openRequest;
  stores = [];

  constructor(name, modulesCollection) {
    Object.assign(this, { name, modulesCollection });
    this.conn = new Promise((resolve, reject) => {
      const request = indexedDB.open(name);
      request.onupgradeneeded = this.upgradeneededHandler;
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => { console.log('blocked'); };
    });
  }

  upgradeneededHandler = (ev) => {
    const db = ev.target.result;
    this.db = db;
    this.modulesCollection.forEach((module) => {
      const objectStore = db.createObjectStore(module, {
        keyPath: `id`,
      });
    });
    const objectStore = db.createObjectStore(moduleUpdatedStore, {
      keyPath: `module`,
    });
  };

  addRecords = async (module, records) => {
    const db = await this.conn;
    const tx = db.transaction(module, `readwrite`);

    tx.oncomplite = (ev) => {
      console.log(ev);
    };

    tx.oncomplite = (ev) => {
      console.log(ev);
    };

    const store = tx.objectStore(module);
    records.forEach((record) => {
      store.add(record);
    });
  };

  storeDateModified =  async (module, date_modified) => {
    const db = await this.conn;
    const tx = db.transaction(moduleUpdatedStore, `readwrite`);
    const store = tx.objectStore(moduleUpdatedStore);
    store.add({ module, date_modified });
  };

  getAllList = async (module) => {
    const db = await this.conn;
    const tx = db.transaction(module, `readonly`);
    return new Promise((resolve, reject) => {
      const store = tx.objectStore(module);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  getRecord = async (module, id) => {
    const db = await this.conn;
    const tx = db.transaction(module, `readonly`);
    return new Promise((resolve, reject) => {
      const store = tx.objectStore(module);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

}

export default IDB;
