function() {
    repl = db.pullFromDatabaseAtURL('http://touchbooks.iriscouch.com/books');
    repl.addEventListener('stopped', function(e) {
      Ti.App.fireEvent('books:refresh_all');
    });
    repl.start();
  }