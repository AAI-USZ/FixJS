function() {
      current = next;
      next = void 0;
      fimo.events.fire("afterPageLoaded", current != null ? current.name : void 0);
      if (current) {
        return current.loaded();
      }
    }