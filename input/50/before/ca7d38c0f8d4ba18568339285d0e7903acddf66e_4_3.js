function(searchTerm, index) {
    query = "find "
      + validPaths[0] //TODO(kchang): Loop through all paths and create separate queries?
      + " "
      + REGEX_IGNORE_HIDDEN
      + " -type f -iname '*"
      + searchTerm //TODO(kchang): Better solution
      + "*' -printf "
      + PRINT_FORMAT;
    queries.push(query);
  }