function(req, res, viewCallback) {
  var LOCAL_SEARCH_PATH = "~"
    , SEARCH_PATH = "/home"
    , REGEX_IGNORE_HIDDEN = "\\( ! -regex '.*/\\..*' \\)" // Discards hidden files and directories
    , PRINT_FORMAT = "'%p||%f||wav\n'"
    , path
    , validPaths = []
    , searchTerms = this.searchTerms
    , results = []
    , findQuery
    , queries = [];
  
  req.user.directories.forEach(function(directory, index) {
    path = LOCAL_SEARCH_PATH
      + "/"
      + directory;
    validPaths.push(path);
  });
  
  // Search available directories for campaigns
  //TODO: Code here
  
  // Search agent, telephone, date
  searchTerms.forEach(function(searchTerm, index) {
    findQuery = "find "
      + validPaths[0] //TODO: Loop through all paths and create separate queries?
      + " "
      + REGEX_IGNORE_HIDDEN
      + " -type f -iname '*"
      + searchTerm //TODO: Better solution
      + "*' -printf "
      + PRINT_FORMAT;
    queries.push(findQuery);
  });
  
  //TODO: Delete this
  /*async.parallel([
    function(callback) {
      queries.forEach(function(query) {
        exec(query, function(err, stdout, stderr) {
          var filesArray
            , elementParsed
            , oneResult;
          
          filesArray = stdout.split("\n");
          filesArray.forEach(function(element, index) {
            if (element !== "") {
              elementParsed = element.split("||"),
              oneResult = new Result(elementParsed[0], elementParsed[1], elementParsed[2]);
              results.push(oneResult);
            }
          });
          callback(null, results);
        });
        
      });
    }
  ],
  function(err, resultsx) {
    console.log(results);
    console.log(resultsx);
    cb(resultsx, searchTerms, req, res);
  });*/
  
  //TODO: Move declarations up when done testing
  var filesArray
    , elementParsed
    , oneResult;
  async.forEachSeries(queries, function(query, callback) {
    exec(query, function(err, stdout, stderr) {

      
      filesArray = stdout.split("\n");
      filesArray.forEach(function(element, index) {
        console.log(2);
        if (element !== "") {
          elementParsed = element.split("||"),
          oneResult = new Result(elementParsed[0], elementParsed[1], elementParsed[2]);
          results.push(oneResult);
        }
      });
      callback(null, results);
    });
  }, function(err) {
    viewCallback(results, searchTerms, req, res); // calls the view
  });
  // TODO: Create a static file containing a directory listing the first time? Use grep to search?
}