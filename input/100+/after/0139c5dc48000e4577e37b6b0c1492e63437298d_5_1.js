function bindElement(elt, context) {
    ASSERT(elt instanceof jQuery, "expected jQuery object");
    ASSERT(elt.length === 1, "expected a single element");
    LOG("Trying to bind #" + elt.attr("id"));

    /* Parse its bindings string. */
    var bindingString = elt.attr("data-bind");
    if (!bindingString) {
      return false;
    }

    /* Credit to Knockout.js for this. */
    var functionBody = "with ($context) { return ({ " + bindingString + " }); } ";
    LOG("functionBody = " + functionBody);
    try {
      var bindingMonad = new Function("$context", functionBody);
    } catch (e) {
      ERROR("expected execution (not construction) of function to throw");
    }

    /* bindings is an object mapping a name of a binder to the value of its
     * options. In the context of the options:
     *
     * - Constants and expressions have already been evaluated.
     * - A variable reference (as opposed to value) will be represented by
     *   its proxy.
     * - This means we cannot yet bind to an expression. One option is to
     *   copy Knockout:
     *   1. Parse binding string as an object literal.
     *   2. For each property,
     *      2.a. Wrap the value (an expression) inside a computed variable.
     *      2.b. Pass the computed variable to the binder named by the key.
     */
    try {
      var bindings = bindingMonad(context);
    } catch (e) {
      var id = elt.attr("id");
      ERROR("cannot parse bindings on " +
            (id ? ("#" + id) : "(unidentified element)") + ":\n  \"" +
            bindingString + "\"\n  " +
            e);
      return true;
    }

    /* Built-in binders expect jQuery objects. */
    return bindAny(elt, bindings, context);
  }