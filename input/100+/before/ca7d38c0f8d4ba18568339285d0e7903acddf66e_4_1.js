function(req, res, viewCallback) {
  var LOCAL_SEARCH_PATH = "~"
    , SEARCH_PATH = "/home"
    , REGEX_IGNORE_HIDDEN = "\\( ! -regex '.*/\\..*' \\)" // Discards hidden files and directories
    , PRINT_FORMAT = "'%p||%f||wav\n'"
    , path
    , validPaths = []
    , searchTerms = this.searchTerms
    , results = []
    , query
    , queries = [];
  
  req.user.directories.forEach(function(directory, index) {
    path = LOCAL_SEARCH_PATH
      + "/"
      + directory;
    validPaths.push(path);
  }) 
  
  // Search available directories for campaigns
  //TODO(kchang): Code here
  
  // Search agent, telephone, date
  searchTerms.forEach(function(searchTerm, index) {
    query = "find "
      + validPaths[0] //TODO(kchang): Loop through all paths and create separate queries?
      + " "
      + REGEX_IGNORE_HIDDEN
      + " -type f -iname '*"
      + searchTerm //TODO(kchang): Better solution
      + "*' -printf "
      + PRINT_FORMAT;
    queries.push(query);
  });
  
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
  
  async.forEachSeries(queries, function(query, callback) {
    exec(query, function(err, stdout, stderr) {
      var filesArray
        , elementParsed
        , oneResult;
      
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

  // TODO: Testing solution, revisit this
  /*searchTerms.forEach(function(element, index) {
    query = "find " 
      + LOCAL_SEARCH_PATH 
      + " " 
      + REGEX_IGNORE_HIDDEN 
      + " -type f -iname '*" 
      + searchTerms 
      + "*' -printf " 
      + PRINT_FORMAT;
  });*/

  // TODO: Create a static file containing a directory listing the first time. Use grep to search.
  //getList(SEARCH_PATH, REGEX_IGNORE_HIDDEN);
  //list = fs.readFileSync('/tmp/query-find.log');
  //campaigns = getCampaigns();
}