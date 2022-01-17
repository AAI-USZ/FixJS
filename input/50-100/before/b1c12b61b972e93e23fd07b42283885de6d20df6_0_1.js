function(name, listener, e) {
      var id = listener.id
        , el = doc.getElementById(id);
      if (el.tagName === 'HTML' || el.contains(e.target)) {
        onTrigger(name, listener, id, e, el);
      }
    }