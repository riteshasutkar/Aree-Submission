var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE group_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER,
            message_sender INTEGER, 
            message_text text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('Table already created.')
            }else{
                // Table just created, creating some rows
                console.log('Table created successfully.')
            }
        });  
    }
});

module.exports = db