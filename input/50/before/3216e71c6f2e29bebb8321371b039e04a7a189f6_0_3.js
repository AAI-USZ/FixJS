function cutByResolution (string) {
  if (string.length > 70) {
    return escaped(string.substr(0, 70)) + '...';
  }
  return escaped(string);
}