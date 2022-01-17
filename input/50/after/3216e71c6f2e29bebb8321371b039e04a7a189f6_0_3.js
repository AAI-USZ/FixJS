function cutByResolution (string) {
  if (string.length > 1024) {
    return escaped(string.substr(0, 1024)) + '...';
  }
  return escaped(string);
}