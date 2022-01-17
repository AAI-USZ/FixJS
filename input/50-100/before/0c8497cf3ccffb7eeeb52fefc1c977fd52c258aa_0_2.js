function(_super) {

    __extends(InOp, _super);

    InOp.prototype.className = 'InOp';

    function InOp(left, right) {
      this.left = left;
      this.right = right;
    }

    return InOp;

  }