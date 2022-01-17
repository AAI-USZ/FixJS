function (where, content) {
    var elem = this.elem;

    switch (where) {
      case 'beforebegin':
      case 'afterend':
        if (this._isRoot) throw new Error('can not insert content at beforebegin on root element');
        break;

      case 'afterbegin':
      case 'beforeend':
        if (this._isSingleton) throw new Error('can not insert content intro singleton element');
        break;

      default:
        throw new Error('did not understand first argument');
    }

    if (elem.insertAdjacentHTML) {
      elem.insertAdjacentHTML(where, content);
      return this;
    }

    // use createContextualFragment as fallback
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
    }

    return this;
  }