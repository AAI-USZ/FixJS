function clean(str) {
  return str                         // Commence ugly regex clean up:
    .replace(/ +([.:,;]|'s)/g, '$1') // " ." -> "." and so on.
    .replace(/<.+?>|\.{2,}/g, '')    // Delete HTML and multiple dots.
    .replace(/&nbsp;| {2,}/gi, ' ')  // Remove excess spaces.
    .trim().replace(/\.$/, '')       // Remove trailing dot.
    .replace(/([(\[{]) *(.+?) *([}\])])/g, '$1$2$3'); // Remove spaces before brackets.
}