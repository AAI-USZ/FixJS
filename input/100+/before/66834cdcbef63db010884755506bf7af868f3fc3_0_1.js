function (document) {

  var NO_ENDING_TAG = ['br', 'col', 'link', 'hr', 'command',
        'embed', 'img', 'input', 'meta', 'param', 'source'];

  /** Main document constructor
   */
  function Document(document) {
    this.tree = document;

    this.elemCache = [];
    this.nodeCache = [];
  }

  // export constructor function
  var enterpoint = function (doc) { return new Document(doc); };
  enterpoint.Document = Document;
  enterpoint.Search = Search;
  enterpoint.Node = Node,
  enterpoint.NO_ENDING_TAG;

  if (typeof module === 'object' && module !== null && module.exports === exports) {
    module.exports = enterpoint;
  } else {
    this.domstream = enterpoint;
  }

  // bind with search constructor
  Document.prototype.find = function () {
    return new Search(this, this.tree);
  };

  /** Search constructor
   */
  function Search(document, tree) {
    this.document = document;
    this.tree = tree;

    this.onlyFlag = false;
    this.onlySearch = false;

    this.searchFilled = false;
    this.searchList = {
      'id': null,
      'tag': null,
      'attr': []
    };
    this.nodeList = [];
  }

  Search.prototype._prepearMatch = function () {
    // throw if more search requests are made
    if (this.onlySearch) {
      throw new Error('can not add search criterias after .toArray or .toValue was called with .only');
    }
  };

  Search.prototype.elem = function (tagname) {
    this._prepearMatch();
    this.searchFilled = true;

    var searchList = this.searchList;

    // set tagname
    if (searchList.tag === null) {
      searchList.tag = tagname;
    }

    // An element can only have one tagname
    // using diffrent tagnames should return nothing
    else if (searchList.tag !== tagname) {
      searchList.tag = false;
    }

    return this;
  };

  Search.prototype.attr = function (name, match) {
    this._prepearMatch();
    this.searchFilled = true;

    var searchList = this.searchList;
    var query = searchList.attr;

    if (typeof name !== 'string') {
      throw new Error('Could not understand arguments');
    } else if (match === undefined) {
      query.push(function (elem) {
        return elem.hasAttribute(name);
      });
    } else if (typeof match === 'string') {

      if (name !== 'id') {
        query.push(function (elem) {
          return elem.getAttribute(name) === match;
        });
      }

      // set id
      else if (searchList.id === null) {
        searchList.id = match;
      }

      // An element can only have one id
      // using diffrent ids should return nothing
      else if (searchList.id !== match) {
        searchList.id = false;
      }

    } else if (match instanceof RegExp) {
      query.push(function (elem) {
        return elem.hasAttribute(name) && match.test( elem.getAttribute(name) );
      });
    } else {
      throw new Error('Could not understand arguments');
    }

    return this;
  };

  Search.prototype.only = function () {
    this.onlyFlag = true;
    return this;
  };

  Search.prototype.toArray = function () {
    if (this.searchFilled) {
      this.nodeList = performSearch(this);
      this.filled = true;
      this.searchFilled = false;
      this.searchList = {
        'id': null,
        'tag': null,
        'attr': []
      };

      // throw if more search requests are made
      if (this.onlyFlag) {
        this.onlySearch = true;
      }
    }

    // convert result to real nodes
    var realNodes = this.onlyFlag ? this.nodeList.slice(0, 1) : this.nodeList.slice(0);

    var map = [];
    for (var i = 0, l = realNodes.length; i < l; i++) {
      map.push(Node.create(this.document, realNodes[i]));
    }

    return map;
  };

  Search.prototype.toValue = function () {
    var result = this.toArray();

    if (result.length === 0) {
      return false;
    } else if (this.onlyFlag) {
      return result.shift();
    } else {
      return result;
    }
  };

  function performSearch(search) {
    var searchList = search.searchList;
    var only = search.onlyFlag;
    var temp = null;

    if (searchList.id === false || searchList.tag === false) return [];

    if (search.filled) {
      return listSearch(search.nodeList, only, search.searchList);
    }

    // search by id
    if (searchList.id) {
      temp = search.tree.getElementById(searchList.id);
      if (temp === null) return [];

      return listSearch([temp], only, {
        id: null,
        tag: searchList.tag,
        attr: searchList.attr
      });
    }

    // search by tagname
    if (searchList.tag) {
      temp = search.tree.getElementsByTagName(searchList.tag);

      return listSearch(temp, only, {
        id: null,
        tag: null,
        attr: searchList.attr
      });
    }

    // search tree
    temp = [];
    searchChildrens(searchList.attr, search.tree, temp, search.onlyFlag);
    return temp;
  }

  function listSearch(list, only, search) {
    var query = search.attr.slice(0);

    // Add id search query
    if (search.id) {
      query.unshift(function (elem) {
        return elem.getAttribute('id', search.id);
      });
    }

    // Add tagname search query
    if (search.tag) {
      query.unshift(function (elem) {
        return elem.tagName.toLowerCase() === search.tag;
      });
    }

    // perform search
    var result = [];
    for (var i = 0, l = list.length; i < l; i++) {
      if (doPass(query, list[i])) {
        result.push(list[i]);
        if (only) return result;
      }
    }

    return result;
  }

  function searchChildrens(query, elem, result, only) {
    var next = elem.firstChild;
    while (next !== null) {
      // we only want elements
      if (next.nodeType === 1) {

        // add elements there match to result list
        if (doPass(query, next)) {
          result.push(next);
          if (only) return true;
        }

        // deep resolve children
        var stop = searchChildrens(query, next, result, only);
        if (stop) return true;

      }

      next = next.nextSibling;
    }

    return false;
  }

  function doPass(query, elem) {
    var i = 0, l = query.length;

    // search in normal order, since its likly that will be the optimised order
    // example: .elem('tag').attr('value', /hallo/) would be a shame to do backwards
    for (; i < l; i++) {
      if (query[i](elem) === false) {
        return false;
      }
    }

    return true;
  }

  /** Node constructor
   */

  function Node(document, elem) {
    this.document = document;
    this.elem = elem;

    // precalculate these, since they in any case will be used
    this._isRoot = elem.nodeType === 9;

    if (this._isRoot === false) {
      this._tagName = elem.tagName.toLowerCase();
      this._isSingleton = NO_ENDING_TAG.indexOf(this._tagName) !== -1;
    } else {
      this._tagName = '';
      this._isSingleton = false;
    }

    this.isChunked = false;
    this.isContainer = false;

    // allow node object to be reused
    document.elemCache.push(elem);
    document.nodeCache.push(this);
  }

  // this function will check the cache and
  // return a new Node object if it don't exist
  // in cache, or return the cached Node object.
  Node.create = function (document, elem) {
    // check cache
    var index = document.elemCache.indexOf(elem);

    // not cached, create new
    if (index === -1) {
      return new Node(document, elem);
    }

    // return cache
    return document.nodeCache[index];
  };

  Node.prototype.tagName = function () {
    if (this._isRoot) throw new Error('root has no tagname');

    return this._tagName;
  };

  Node.prototype.isSingleton = function () {
    return this._isSingleton;
  };

  Node.prototype.isRoot = function () {
    return this._isRoot;
  };

  Node.prototype.getParent = function () {
    if (this._isRoot) throw new Error('root has no parent');

    return Node.create(this.document, this.elem.parentNode);
  };

  Node.prototype.getChildren = function () {
    if (this._isSingleton) throw new Error('singleton element has no children');

    var next = this.elem.firstChild;
    var nodes = [];
    while (next !== null) {
      if (next.nodeType === 1) {
        nodes.push(Node.create(this.document, next));
      }

      next = next.nextSibling;
    }

    return nodes;
  };

  Node.prototype.isParentTo = function (node) {
    var parent = node.elem.parentNode;

    return !!parent && this.elem === parent;
  };

  Node.prototype.done = function () {
    return this;
  };

  Node.prototype.insert = function (where, content) {
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
  };

  Node.prototype.append = function (content) {
    this.insert('beforeend', content);

    return this;
  };

  Node.prototype.remove = function () {
    if (this._isRoot) throw new Error('can not remove root element element');

    this.elem.parentNode.removeChild(this.elem);

    return this;
  };

  Node.prototype.trim = function () {
    if (this._isSingleton) throw new Error('can not remove content from singleton element');

    var elem = this.elem;
    while(elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }

    return this;
  };

  Node.prototype.getContent = function () {
    if (this._isSingleton) throw new Error('can not get content from singleton element');

    return this.elem.innerHTML;
  };

  Node.prototype.setContent = function (content) {
    this.trim();
    this.insert('afterbegin', content);
    return this;
  };

  Node.prototype.getAttr = function (name) {
    return this.elem.getAttribute(name);
  };

  Node.prototype.hasAttr = function (name) {
    return this.elem.hasAttribute(name);
  };

  Node.prototype.setAttr = function (name, value) {
    if (this._isRoot) throw new Error('can not set attribute on root element');

    this.elem.setAttribute(name, value);
    return this;
  };

  Node.prototype.removeAttr = function (name) {
    if (this._isRoot) throw new Error('can not remove attribute from root element');

    this.elem.removeAttribute(name);
    return this;
  };

  Node.prototype.find = function () {
    return new Search(this.document, this.elem);
  };

}