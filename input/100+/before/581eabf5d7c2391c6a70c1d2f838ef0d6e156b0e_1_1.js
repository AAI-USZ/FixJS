function getLanguage(alias, strict) {
  // accept *.ext, .ext and ext
  var normalizedAlias = alias.replace(/^\*/,'').replace(/^\./,'');

  return langMap[normalizedAlias] || (!strict ? similarMap[normalizedAlias] : undefined);
}