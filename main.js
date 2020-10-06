var db;
var name = document.getElementById("name");
var age = document.getElementById("age");
var email = document.getElementById("email");

function onstart(){

    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }



var request = indexedDB.open("MyTestDatabase",1);
request.onerror = function(event) {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('age', 'age', { unique: false })
  }

}

function adding() {
    var request = db.transaction('person', 'readwrite')
      .objectStore('person')
      .add({ id: 1, name: 'Jam', age: 23, email: 'jam@example.com' })
      var request = db.transaction('person', 'readwrite')
      .objectStore('person').add({ id: 2, name: 'Kam', age: 24, email: 'kam@example.com' });
      var request = db.transaction('person', 'readwrite')
      .objectStore('person').add({ id: 3, name: 'Sam', age: 33, email: 'sam@example.com' });
      var request = db.transaction('person', 'readwrite')
      .objectStore('person').add({ id: 4, name: 'Lam', age: 32, email: 'lam@example.com' });
      var request = db.transaction('person', 'readwrite')
      .objectStore('person').add({ id: 5, name: 'Tam', age: 38, email: 'tam@example.com' });
      var request = db.transaction('person', 'readwrite')
      .objectStore('person').add({ id: 6, name: 'Ram', age: 13, email: 'ram@example.com' });


    request.onsuccess = function (event) {
      console.log('The data has been written successfully');
    };

    request.onerror = function (event) {
      console.log('The data has been written failed');
    }
  }

function readingdata(){

        /** When initiating a single object store [] notation is not required.
	  object store names in array are used when you want to initiate multiple object stores for same transaction
	**/

        var transaction = db.transaction('person');
        var objectStore = transaction.objectStore('person');
        var request = objectStore.get(1);

        request.onerror = function(event) {
          console.log('Transaction failed');
        };

        request.onsuccess = function( event) {
           if (request.result) {
            document.getElementById("name").innerHTML= 'Name: ' + request.result.name;
               age.innerHTML= 'Age: ' + request.result.age;
               email.innerHTML= 'Email: ' + request.result.email;
             console.log('Name: ' + request.result.name);
             console.log('Age: ' + request.result.age);
             console.log('Email: ' + request.result.email);
           } else {
             console.log('No data record');
           }
        };

}

function readalldata(){
  var transaction = db.transaction("person");
  var objectStore = transaction.objectStore('person');
  var request = objectStore.openCursor();

  request.onsuccess = function(event){
    var cursor = event.target.result;
/**
       Variable names should be explainatory. don't assign random characters as variables names.
       It makes code harder to read.
    **/

    if(cursor){
     

      const cont = createElement('div', {
        className:'mdc-card mdc-card--outlined'
    })

    const details = createElement('div', {
      className:'all_details'
  })

  details.innerHTML = `<div class='details'>
    <h2 >ID ${cursor.key}</h2>
    <p ><b>Name </b>: ${cursor.value.name}</p>
    <p >Age: ${cursor.value.age}</p>
    <p >Email: ${cursor.value.email}</p>
    </div>`

    cont.appendChild(details);
    document.getElementById("root").appendChild(cont);

    
      cursor.continue();
    }else{
      console.log("Read All Info");
    }
  }
}



// TODO :

// 1) use createElement function from frontend repo to create dom elements
// 2) create a simple MDC Card , in that card set card's heading to be record id
// and in each new line show name,age and email

function createElement(tagName, attrs) {
  const el = document.createElement(tagName)
  if (attrs) {
      Object.keys(attrs).forEach(function (attr) {
          el[attr] = attrs[attr]
      })
  }
  return el;
}