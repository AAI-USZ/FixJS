function (link) {
    link.removeEventListener('click', onLinkClick);
    link.addEventListener('click', onLinkClick);
  }