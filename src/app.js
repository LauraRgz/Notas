import yargs from 'yargs';
import fs from 'fs';
import uuid from 'uuid';


let obj;

const list = function(){
  obj.notes.forEach( (note, i) => {
    console.log(`${i}: ${note.title}`);
  })
}

const add = function(argv){
  const nota = {
    uuid: uuid.v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author,
  };

  obj.notes.push(nota);
  console.log(`Added: ${nota.title}`);
}

const remove = function(argv){
  obj.notes.forEach((note, i) => {
    obj.notes.splice(obj.notes.indexOf(nota.title),1);
  })
}

const read = function(argv){
  obj.notes.forEach((note, i) => {
    if (note.title == argv.title)
      console.log(`Title: ${note.title} \n Body: ${note.body} \n Author: ${note.author}`);
    
  })
}

// Create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: add,
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'list existing notes',
  handler: list,
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: remove,
});

//Create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },
  },  
  handler: read,
});

const path = './notas.txt';
fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFileSync("notas.txt","");
  }

  const data = fs.readFileSync("notas.txt").toString();

  if(data !== ""){
    obj = JSON.parse(data);
  }else{
    obj = {
      notes: [

      ]
    };
  }

  yargs.parse();
  fs.writeFileSync("notas.txt", JSON.stringify(obj));
});



// yargs.parse();

// npm i --save yargs

// yargs.parse();

// const obj = {
//   name: 'Alberto',
//   friends: ['Luis', 'Jorge', 'Maria'],
// };

// const str = JSON.stringify(obj);
// console.log(str);

// const obj2 = JSON.parse(str);
// console.log(obj2);

// fs.writeFileSync('notes.txt', str);
// const obj3 = JSON.parse(fs.readFileSync('notes.txt').toString());

// console.log(obj3);
