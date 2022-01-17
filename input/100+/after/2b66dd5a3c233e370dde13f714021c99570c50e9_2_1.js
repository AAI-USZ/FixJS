function() {
    var bar, baz, foo, var1, var2, var3;
    Finch.route("/foo", foo = this.stub());
    Finch.route("[/foo]/bar", bar = this.stub());
    Finch.route("[/foo/bar]/baz", baz = this.stub());
    Finch.route("/:var1", var1 = this.stub());
    Finch.route("[/:var1/]:var2", var2 = this.stub());
    Finch.route("[/:var1/:var2]/:var3", var3 = this.stub());
    Finch.call("/foo/nope");
    calledOnce(var1, "var1 called once");
    lastCalledWithExactly(var1, [
      {
        var1: "foo"
      }
    ], "var1 called with binding for var1");
    calledOnce(var2, "var2 called once");
    lastCalledWithExactly(var2, [
      {
        var1: "foo",
        var2: "nope"
      }
    ], "var2 called with bindings for var1 and var2");
    return neverCalled(foo, "foo never called");
  }