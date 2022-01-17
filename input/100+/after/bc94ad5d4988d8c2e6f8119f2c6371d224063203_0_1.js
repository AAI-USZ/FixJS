function (html_func, react_data, in_range) {
    if (typeof html_func !== "function")
      throw new Error("Meteor.ui.render() requires a function as its first argument.");

    if (Meteor.ui._render_mode)
      throw new Error("Can't nest Meteor.ui.render.");

    var cx = new Meteor.deps.Context;

    Meteor.ui._render_mode = {callbacks: {_count: 0}};
    var html, rangeCallbacks;
    try {
      html = cx.run(html_func); // run the caller's html_func
    } finally {
      rangeCallbacks = Meteor.ui._render_mode.callbacks;
      Meteor.ui._render_mode = null;
    }

    if (typeof html !== "string")
      throw new Error("Render function must return a string");

    var frag = Meteor.ui._htmlToFragment(html);
    if (! frag.firstChild)
      frag.appendChild(document.createComment("empty"));


    // Helper that invokes `f` on every comment node under `parent`.
    // If `f` returns a node, visit that node next.
    var each_comment = function(parent, f) {
      for (var n = parent.firstChild; n;) {
        if (n.nodeType === 8) { // comment
          n = f(n) || n.nextSibling;
          continue;
        } else if (n.nodeType === 1) { // element
          each_comment(n, f);
        }
        n = n.nextSibling;
      }
    };

    // walk comments and create ranges
    var rangeStartNodes = {};
    var rangesCreated = []; // [[range, id], ...]
    each_comment(frag, function(n) {

      var rangeCommentMatch = /^\s*(START|END)RANGE_(\S+)/.exec(n.nodeValue);
      if (! rangeCommentMatch)
        return null;

      var which = rangeCommentMatch[1];
      var id = rangeCommentMatch[2];

      if (which === "START") {
        if (rangeStartNodes[id])
          throw new Error("The return value of chunk can only be used once.");
        rangeStartNodes[id] = n;

        return null;
      }
      // else: which === "END"

      var startNode = rangeStartNodes[id];
      var endNode = n;
      var next = endNode.nextSibling;

      // try to remove comments
      var a = startNode, b = endNode;
      if (a.nextSibling && b.previousSibling) {
        if (a.nextSibling === b) {
          // replace two adjacent comments with one
          endNode = startNode;
          b.parentNode.removeChild(b);
          startNode.nodeValue = 'placeholder';
        } else {
          // remove both comments
          startNode = startNode.nextSibling;
          endNode = endNode.previousSibling;
          a.parentNode.removeChild(a);
          b.parentNode.removeChild(b);
        }
      } else {
        /* shouldn't happen; invalid HTML? */
      }

      if (startNode.parentNode !== endNode.parentNode) {
        // Try to fix messed-up comment ranges like
        // <!-- #1 --><tbody> ... <!-- /#1 --></tbody>,
        // which are extremely common with tables.  Tests
        // fail in all browsers without this code.
        if (startNode === endNode.parentNode ||
            startNode === endNode.parentNode.previousSibling) {
          startNode = endNode.parentNode.firstChild;
        } else if (endNode === startNode.parentNode ||
                   endNode === startNode.parentNode.nextSibling) {
          endNode = startNode.parentNode.lastChild;
        } else {
          var r = new RegExp('<!--\\s*STARTRANGE_'+id+'.*?-->', 'g');
          var match = r.exec(html);
          var help = "";
          if (match) {
            var comment_end = r.lastIndex;
            var comment_start = comment_end - match[0].length;
            var stripped_before = html.slice(0, comment_start).replace(
                /<!--\s*(START|END)RANGE.*?-->/g, '');
            var stripped_after = html.slice(comment_end).replace(
                /<!--\s*(START|END)RANGE.*?-->/g, '');
            var context_amount = 50;
            var context = stripped_before.slice(-context_amount) +
                  stripped_after.slice(0, context_amount);
            help = " (possible unclosed near: "+context+")";
          }
          throw new Error("Could not create liverange in template. "+
                          "Check for unclosed tags in your HTML."+help);
        }
      }

      var range = new Meteor.ui._LiveRange(Meteor.ui._tag, startNode, endNode);
      rangesCreated.push([range, id]);

      return next;
    });


    var range;
    if (in_range) {
      // Called to re-render a chunk; update that chunk in place.
      Meteor.ui._intelligent_replace(in_range, frag);
      range = in_range;
    } else {
      range = new Meteor.ui._LiveRange(Meteor.ui._tag, frag);
    }

    // Call "added to DOM" callbacks to wire up all sub-chunks.
    _.each(rangesCreated, function(x) {

      var range = x[0];
      var id = x[1];
      if (rangeCallbacks[id])
        rangeCallbacks[id](range);
    });


    Meteor.ui._wire_up(cx, range, html_func, react_data);
    return (in_range ? null : frag);

  }