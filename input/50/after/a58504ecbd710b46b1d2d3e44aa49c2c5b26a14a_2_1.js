function formatter(i) {
  return format('%s %s (%s): %s',
    c('yellow', '└→'), i.name, c('light_green', '@' + i.user), i.text);
}