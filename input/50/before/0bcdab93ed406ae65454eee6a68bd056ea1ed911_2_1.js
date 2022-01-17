function formatter(i) {
  return i                        // Sanitize output
    .replace(/\n/g, ' ')          // Obliterate line changes
    .replace(/[ ]{2,}/g, ' ');    // Remove multiple spaces
}