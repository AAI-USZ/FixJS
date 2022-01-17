function getLanguage(alias, strict) {
  return langMap[alias] || (!strict ? similarMap[alias] : undefined);
}