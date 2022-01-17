function selectTag(link, tagList, update) {
    var index = link.dataset.index;
    if (update) {
      update.textContent = TAG_OPTIONS[tagList][index].value;
    }

    if (selectedTag) {
      // TODO: Regex
      var tagContent = selectedTag.innerHTML;
      var findIcon = tagContent.indexOf('<');
      selectedTag.innerHTML = tagContent.substr(0, findIcon);
    }

    var icon = document.createElement('span');
    icon.className = 'slcl-state icon-selected';
    icon.setAttribute('role', 'button');
    link.appendChild(icon);
    selectedTag = link;
  }