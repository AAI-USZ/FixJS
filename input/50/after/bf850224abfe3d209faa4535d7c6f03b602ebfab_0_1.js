function clear() {
      while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
      }
      index = [];
    }