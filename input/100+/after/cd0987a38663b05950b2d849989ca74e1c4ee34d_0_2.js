function jsonToList(content) {
  str = '<ul>';

  for (var pos in content) {
    var child = content[pos];

    str += '<li';

    if (child['url']) {
      str += '><a href="' + child['url'] + '">';
    } else {
      str += ' class="listHeader" onclick="toggleSubList(this);">';
    }

    if (child['icon']) {
      str += '<p class="' + child['icon'] + '">';
    } else {
      str += '<p>';
    }

    str += child['label'];

    /* Indicate this is a list header */
    if (!child['url']) {
      str += ':';
    }

    str += '</p>';

    if (child['url']) {
      str += '</a>';
    }

    str += '</li>';

    if (child['children']) {
      str += jsonToList(child['children']);
    }
  }
  
  str += '</ul>';
  return str;
}