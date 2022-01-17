function pgEscape(s) {
  s = Utils.escape(s)

  if (typeof s == 'string') {
    // http://www.postgresql.org/docs/8.2/static/sql-syntax-lexical.html#SQL-SYNTAX-STRINGS
    s = s.replace(/\\'/g, "''")
  }

  return s
}