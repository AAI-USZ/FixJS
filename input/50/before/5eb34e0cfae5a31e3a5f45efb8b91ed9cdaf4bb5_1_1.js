function(expected, actual) {
  actual = actual || ""
  if(actual.indexOf(expected) == -1) {
    sys.debug("Expected:\n\n<"+actual+">\n\nto contain <"+expected+">")
  }
}