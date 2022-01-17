function (where, content) {
    var elem = this.elem;

    if (elem.insertAdjacentHTML) {
      elem.insertAdjacentHTML(where, content);
      return this;
    }

    // use createContextualFragment as fallback
    /*
    var fragment = document.createRange().createContextualFragment(content);

    switch (where) {
      case "beforebegin":
        elem.parentNode.insertBefore(fragment, elem);
        break;
      case "afterbegin":
        elem.insertBefore(fragment, elem.firstChild);
        break;
      case "beforeend":
        elem.appendChild(fragment);
        break;
      case "afterend":
        elem.parentNode.insertBefore(fragment, elem.nextSibling);
        break;
      default:
        throw new Error('did not understand first argument');
    }
    */

    return this;
  }