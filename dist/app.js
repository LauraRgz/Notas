"use strict";

var _yargs = _interopRequireDefault(require("yargs"));

var _fs = _interopRequireDefault(require("fs"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var obj;

var list = function list() {
  obj.notes.forEach(function (note, i) {
    console.log("".concat(i, ": ").concat(note.title));
  });
};

var add = function add(argv) {
  var nota = {
    uuid: _uuid["default"].v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author
  };
  obj.notes.push(nota);
  console.log("Added: ".concat(nota.title));
};

var remove = function remove(argv) {
  obj.notes.forEach(function (note, i) {
    obj.notes.splice(obj.notes.indexOf(nota.title), 1);
  });
};

var read = function read(argv) {
  obj.notes.forEach(function (note, i) {
    if (note.title == argv.title) console.log("Title: " + note.title + "\n" + "ID:  " + note.uuid + "\n" + "Body: " + note.body + "\n" + "Author: " + note.author); //`Title: ${note.title} \n Body: ${note.body} \n Author: ${note.author}`
  });
}; // Create add command


_yargs["default"].command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string'
    },
    author: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: add
}); // Create list command


_yargs["default"].command({
  command: 'list',
  describe: 'list existing notes',
  handler: list
}); // Create remove command


_yargs["default"].command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: remove
}); //Create read command


_yargs["default"].command({
  command: 'read',
  describe: 'read a note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: read
});

var path = './notas.txt';

_fs["default"].access(path, _fs["default"].F_OK, function (err) {
  if (err) {
    _fs["default"].writeFileSync("notas.txt", "");
  }

  var data = _fs["default"].readFileSync("notas.txt").toString();

  if (data !== "") {
    obj = JSON.parse(data);
  } else {
    obj = {
      notes: []
    };
  }

  _yargs["default"].parse();

  _fs["default"].writeFileSync("notas.txt", JSON.stringify(obj));
}); // yargs.parse();
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