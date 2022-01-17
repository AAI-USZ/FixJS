function selectTag(link, tagList) {
    if (link == null) {
      return;
    }

    //Clean any trace of the custom tag
    customTag.value = '';

    var index = link.dataset.index;
    if (tagList && contactTag) {
      contactTag.textContent = TAG_OPTIONS[tagList][index].value;
    }

    if (selectedTag) {
      selectedTag.removeChild(selectedTag.firstChild.nextSibling);
    }

    var icon = document.createElement('span');
    icon.className = 'slcl-state icon-selected';
    icon.setAttribute('role', 'button');
    link.appendChild(icon);
    selectedTag = link;
  }