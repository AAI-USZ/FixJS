function(cursor) {
    if (!this.replacedFragment) {
      var prev = cursor.prev;
      while (prev &&
        !(
          prev instanceof BinaryOperator ||
          prev instanceof TextBlock ||
          prev instanceof BigSymbol
        ) //lookbehind for operator
      )
        prev = prev.prev;

      if (prev instanceof BigSymbol && prev.next instanceof SupSub) {
        prev = prev.next;
        if (prev.next instanceof SupSub && prev.next.ctrlSeq != prev.ctrlSeq)
          prev = prev.next;
      }

      if (prev !== cursor.prev) {
        this.replaces(MathFragment(prev.next || cursor.parent.firstChild, cursor.prev));
        cursor.prev = prev;
      }
    }
    _super.createBefore.call(this, cursor);
  }