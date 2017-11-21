const db = require("../config/db")

class Question{
  static CreateTable() {
    return new Promise(function(resolve){
      const sql = `CREATE TABLE questions (
        id INTEGER PRIMARY KEY,
        content TEXT
      )`

      db.run(sql, function(){
        resolve("questions table created");
      })
    })
  }

  constructor(content){
    this.content = content;
  }

  insert(){
    const self = this;
    const sql = `INSERT INTO questions (content) VALUES (?)`;
    return new Promise(function(resolve){
      db.run(sql, [self.content], function(err, result){
        self.id = this.lastID;
        resolve(self);
      })
    })
  }

  static Find(id) {
    const sql = `SELECT * FROM questions WHERE id = (?)`;
    return new Promise(function(resolve){
      db.get(sql, [id], function(err, result){
        const question = new Question(result.content);
        question.id = result.id;
        resolve(question);

      })
    })

  }
}

module.exports = Question;
