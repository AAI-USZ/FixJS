function() {
    var bst, findInBst;
    if (typeof inBrowser !== "undefined" && inBrowser !== null) {
      bst = {
        node: 10,
        left: {
          node: 4,
          left: null,
          right: null
        },
        right: {
          node: 12,
          left: null,
          right: null
        }
      };
      findInBst = function(t, n) {
        if (t === null) {
          return false;
        } else {
          return (t.node === n) || (n < t.node ? findInBst(t.left, n) : void 0) || (n > t.node ? findInBst(t.right, n) : void 0);
        }
      };
      eq(findInBst(bst, 10), true, "node exists and abides by contract");
      eq(findInBst(bst, 12), true, "node exists and has to go down a level");
      eq(findInBst(bst, 20), false, "node does not exist in bst");
      bst.right.node = 0;
      throws((function() {
        return findInBst(bst, 100);
      }), "invariant is violated");
      return throws((function() {
        return bst.node = 0;
      }), "invariant is violated");
    }
  }