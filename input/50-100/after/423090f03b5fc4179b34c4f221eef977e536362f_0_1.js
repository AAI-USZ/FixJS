function escapeHTML(str, escapeQuotes) {
  var span = document.createElement('span');
  span.textContent = str;

  // Escape space for displaying multiple space in message.
  span.innerHTML = span.innerHTML.replace(/\s/g, '&nbsp;');

  if (escapeQuotes)
    return span.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  return span.innerHTML;
}