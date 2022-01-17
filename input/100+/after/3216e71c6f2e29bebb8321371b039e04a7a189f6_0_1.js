function value2html (value) {
  var checked = typeof(value); 
  switch(checked) { 
    case 'number': 
    return ("<a class=\"sh_number\">" + value + "</a>");
    case 'string': 
    return ("<a class=\"sh_string\">"  + escaped(value) + "</a>");
    case 'boolean': 
    return ("<a class=\"sh_keyword\">" + value + "</a>");
    case 'object':
    if (value instanceof Array) {
      return ("<a class=\"sh_array\">" + escaped(JSON.stringify(value)) + "</a>");
    }
    else {
      return ("<a class=\"sh_object\">"+ escaped(JSON.stringify(value)) + "</a>");
    }
  }
}