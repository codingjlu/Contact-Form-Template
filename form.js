const Database = require("@replit/database"); // ReplitDB
const db = new Database();
const { v4: uuidv4 } = require('uuid'); // Unique IDs for the name of each submission

// Add an entry
exports.submit = (form, callback) => {
  db.set(uuidv4(), {
    name: form.name,
    email: form.email,
    message: form.message,
    time: new Date(),
  }).then(callback);
};

// A complicated manuever to get all the keys and values of the database
exports.getAll = callback => {
  db.list().then(what => { // List all keys
    let result = [];
    if(what.length === 0) return callback(null); // If there are no submissions, just continue
    what.forEach(item => { // Keys forEach
      db.get(item).then(val => { // Get the value of that key
        // Add key and value to result
        result.push({
          key: item,
          val: val
        });
        if (result.length === what.length) { // Callback once forEach is done. Pass the value back to the callee
          callback(result.sort((a, b) => (a.val.time > b.val.time) ? 1 : -1)); // Sort the array
        }
      });
    });
  });
};

// Delete a key
exports.deleteOne = (key, callback) => {
  db.delete(key).then(callback); // Done
};

// Delete all keys
exports.deleteAll = () => {
  db.list().then(keys => { // List all keys
    keys.forEach(item => { // Delete each item
      db.delete(item);
    });
  });
}

// Get one item
exports.getOne = key => {
  return new Promise(resolve => { // Resolves in a promise
    db.get(key).then(resolve);
  });
}
