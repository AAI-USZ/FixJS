function(path) {
  return !HAS_THIS.test(path) && IS_GLOBAL.test(path);
}