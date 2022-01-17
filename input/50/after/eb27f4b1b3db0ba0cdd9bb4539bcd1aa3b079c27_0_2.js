function children (child) {
      for (; child != null; child = child.nextSibling) {
        if (!visit(wrap(child))) return false;
      }
      return true;
    }