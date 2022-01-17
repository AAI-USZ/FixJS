function(name, listener, e) {
      var id = listener.id
        , el = doc.getElementById(id);

      // Remove listener if element isn't found
      if (!el) return false;

      if (el.tagName === 'HTML' || el.contains(e.target)) {
        onTrigger(name, listener, id, e, el);
      }
    }