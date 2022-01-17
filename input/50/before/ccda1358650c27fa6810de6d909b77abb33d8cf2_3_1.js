function() {
      current = next;
      next = void 0;
      if (current) {
        current.loaded();
      }
      return fimo.events.fire("afterPageLoaded", current != null ? current.name : void 0);
    }