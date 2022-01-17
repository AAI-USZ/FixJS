function formatter(i) {
  return format('Tweet by %s (%s): %s', i.name, c('light_green', '@' + i.user), i.text);
}