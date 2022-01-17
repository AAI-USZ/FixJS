function(searchTerm, index) {
    findQuery = "find "
      + validPaths[0] //TODO: Loop through all paths and create separate queries?
      + " "
      + REGEX_IGNORE_HIDDEN
      + " -type f -iname '*"
      + searchTerm //TODO: Better solution
      + "*' -printf "
      + PRINT_FORMAT;
    queries.push(findQuery);
  }