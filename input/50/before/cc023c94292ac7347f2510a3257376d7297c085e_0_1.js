function pgEscape(s) {
  s = Utils.escape(s)
  if (typeof s == 'string') s = s.replace(/\\"/g, '"')
  return s
}