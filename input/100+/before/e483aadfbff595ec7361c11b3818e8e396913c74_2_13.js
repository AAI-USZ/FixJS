function add(element, events, fn, selector, getDelegate){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []));
    eachEvent(events, fn, function(event, fn){
      var delegate = getDelegate && getDelegate(fn, event),
        callback = delegate || fn;
      var proxyfn = function (event) {
        var result = callback.apply(element, [event].concat(event.data));
        if (result === false) event.preventDefault();
        return result;
      };
      var handler = $.extend(parse(event), {fn: fn, proxy: proxyfn, sel: selector, del: delegate, i: set.length});
      set.push(handler);
      element.addEventListener(handler.e, proxyfn, false);
    });
  }