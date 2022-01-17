function(done) {
    sqlite3.connect(':memory:', onConnect);

    function onConnect(err, dbDriver) {
      driver = dbDriver;
      driver.client.run('CREATE TABLE person (id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(100), age INTEGER DEFAULT 30);', createIndex);
    }

    function createIndex(err) {
      driver.client.run('CREATE INDEX person_name_idx ON person (name, age)', done);
    }
  }