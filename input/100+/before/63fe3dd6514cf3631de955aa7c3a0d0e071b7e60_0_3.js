function(selector, from, callback) {

      var i, changed, element, elements, parts, resolver, token;

      if (arguments.length === 0) {
        emit('Missing required selector parameters');
        return [ ];
      } else if (selector === '') {
        emit('Empty selector string');
        return [ ];
      } else if (typeof selector != 'string') {
        // QSA capable browsers do not throw
        return [ ];
      }

      // ensure context is set
      from || (from = doc);

      if (RE_SIMPLE_SELECTOR.test(selector)) {
        switch (selector.charAt(0)) {
          case '#':
            if ((element = byId(selector.slice(1), from))) {
              callback && callback(element);
              return [ element ];
            }
            return [ ];
          case '.':
            elements = byClass(selector.slice(1), from);
            break;
          default:
            elements = byTag(selector, from);
            break;
        }
        return callback ?
          concatCall([ ], elements, callback) : elements;
      }

      if (USE_QSAPI && !RE_BUGGY_QSAPI.test(selector) &&
        QSA_NODE_TYPES[from.nodeType]) {

        // clear error state
        lastError = null;

        try {
          elements = from.querySelectorAll(selector);
        } catch(e) {
          // remember last error
          lastError = e;
          if (selector === '') throw e;
        }

        if (elements) {
          switch (elements.length) {
            case 0:
              return [ ];
            case 1:
              element = elements.item(0);
              callback && callback(element);
              return [ element ];
            default:
              return callback ?
                concatCall([ ], elements, callback) :
                NATIVE_SLICE_PROTO ?
                  slice.call(elements) :
                  concatList([ ], elements);
          }
        }
      }

      selector = selector.replace(reTrimSpaces, '');

      if (SHORTCUTS) {
        // add left context if missing
        if (reLeftContext.test(selector)) {
          selector = from.nodeType == 9 ? '* ' + selector :
            from.id ? '#' + from.id + ' ' + selector :
              selector;
        }
        // add right context if missing
        if (reRightContext.test(selector)) {
          selector = selector + ' *';
        }
      }

      // extract context if changed
      if (lastSelectContext != from) {
        // save passed context
        lastSelectContext = from;
        // reference context ownerDocument and document root (HTML)
        root = (doc = from.ownerDocument || from).documentElement;
        isQuirksMode = isQuirks(doc);
        isXMLDocument = isXML(doc);
      }

      if ((changed = lastSelector != selector)) {
        // process valid selector strings
        if ((parts = selector.match(reValidator)) && parts[0] == selector) {
          // save passed selector
          lastSelector = selector;
          isSingleSelect = (parts = selector.match(reSplitGroup)).length < 2;
        } else {
          emit('The string "' + selector + '", is not a valid CSS selector');
          return [ ];
        }
      }

      // commas separators are treated sequentially to maintain order
      if (isSingleSelect && from.nodeType != 11) {

        if (changed) {
          // get right most selector token
          parts = selector.match(reSplitToken);
          token = parts[parts.length - 1];

          // position where token was found
          lastPosition = selector.length - token.length;

          // only last slice before :not rules
          lastSlice = token.split(':not')[0];
        }

        // ID optimization RTL, to reduce number of elements to visit
        if ((parts = lastSlice.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = byId(token, from))) {
            if (match(element, selector)) {
              callback && callback(element);
              return [ element ];
            }
          }
          return [ ];
        }

        // ID optimization LTR, to reduce selection context searches
        else if ((parts = selector.match(Optimize.ID)) && (token = parts[1])) {
          if ((element = byId(token, doc))) {
            if ('#' + token == selector) {
              callback && callback(element);
              return [ element ];
            }
            if (/[>+~]/.test(selector)) {
              from = element.parentNode;
            } else {
              selector = selector.replace('#' + token, '*');
              lastPosition -= token.length + 1;
              from = element;
            }
          } else return [ ];
        }

        if (!NATIVE_GEBCN && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

        else if ((parts = lastSlice.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = byClass(token, from)).length === 0) { return [ ]; }
          if (reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1))) {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '');
          } else {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '*');
          }
        }

        else if ((parts = selector.match(Optimize.CLASS)) && (token = parts[1])) {
          if ((elements = byClass(token, from)).length === 0) { return [ ]; }
          for (var z = 0, els = [ ]; elements.length > z; ++z) {
            els = concatList(els, elements[z].getElementsByTagName('*'));
          }
          elements = els;
          if (reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1))) {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '');
          } else {
            selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace('.' + token, '*');
          }
        }

        else if (NATIVE_GEBCN && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
          if ((elements = byTag(token, from)).length === 0) { return [ ]; }
          selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, '*');
        }

      }

      if (!elements) {
        elements = byTag('*', from);
      }
      // end of prefiltering pass

      // compile selector resolver if necessary
      resolver = (isXMLDocument && XMLResolvers[selector]) ?
        XMLResolvers[selector] : HTMLResolvers[selector] ?
          HTMLResolvers[selector] : (isXMLDocument ?
            XMLResolvers : HTMLResolvers)[selector] = isSingleSelect ?
              new Function('c,s,r,d,h,g,f', 'var N,n,x=0,k=-1,e;main:while((e=c[++k])){' +
                compileSelector(selector, ACCEPT_NODE) + '}return r;') :
              compileGroup(parts || selector, '', true);

      return resolver(elements, snap, [ ], doc, root, from, callback);
    }