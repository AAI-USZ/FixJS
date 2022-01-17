function getBrush(alias, strict) {
  return brushMap[alias] || (!strict ? similarMap[alias] : undefined);
}