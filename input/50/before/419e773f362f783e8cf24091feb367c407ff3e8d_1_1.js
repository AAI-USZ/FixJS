function sanitizeForRegex(s) {
  return s.replace(/[#-.]|[[-^]|[?|{}]/, '\\$&');
}