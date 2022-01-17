function re_quote(s) {
  return s.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g, "\\$&");
}