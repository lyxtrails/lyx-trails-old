const firebase = require("firebase");
const { environment } = require('../environments/environment');

firebase.initializeApp(environment.firebase);

const storageRef = firebase.storage().ref();

module.exports = {
  readFile: (path, cb) => {
    return storageRef
    .child(path)
    .getDownloadURL()
    .then((url) => { 
      var xhr = new XMLHttpRequest();
      xhr.onload = function(event) {
        cb(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }); 
  }
}