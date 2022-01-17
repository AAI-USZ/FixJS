function SourceUnderline(sourceText, position, repl) {
  if (!sourceText) return '';

  var head = sourceText.slice(0, position),
      tail = sourceText.slice(position);

  // Colourize char if stdout supports colours
  if (repl.useColors) {
    tail = tail.replace(/(.+?)([^\w]|$)/, '\033[32m$1\033[39m$2');
  }

  // Return source line with coloured char at `position`
  return [
    head,
    tail
  ].join('');
}