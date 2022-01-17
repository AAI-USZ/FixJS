function(_, _super) {
  _.init = function(ctrlSeq, htmlTemplate, textTemplate) {
    var cmd = this;

    _super.init.call(cmd);

    if (!cmd.ctrlSeq) cmd.ctrlSeq = ctrlSeq;
    if (htmlTemplate) cmd.htmlTemplate = htmlTemplate;
    if (textTemplate) cmd.textTemplate = textTemplate;
  };

  // obvious methods
  _.replaces = function(replacedFragment) {
    this.replacedFragment = replacedFragment;
  };
  _.isEmpty = function() {
    return this.foldChildren(true, function(isEmpty, child) {
      return isEmpty && child.isEmpty();
    });
  };

  // createBefore(cursor) and the methods it calls
  _.createBefore = function(cursor) {
    var cmd = this;

    cmd.createBlocks();
    cmd.jQize();
    if (cmd.replacedFragment) {
      var firstBlock = cmd.firstChild,
        replacementBlock = cmd.replacedFragment.blockify();
      firstBlock.jQ.append(replacementBlock.jQ);
      // insert math tree contents of replacementBlock into firstBlock
      firstBlock.firstChild = replacementBlock.firstChild;
      firstBlock.lastChild = replacementBlock.lastChild;
      firstBlock.eachChild(function(child) {
        child.parent = firstBlock;
      });
    }

    cursor.jQ.before(cmd.jQ);

    cursor.prev = cmd.insertAt(cursor.parent, cursor.prev, cursor.next);

    //adjust context-sensitive spacing
    cmd.respace();
    if (cmd.next)
      cmd.next.respace();
    if (cmd.prev)
      cmd.prev.respace();

    cmd.placeCursor(cursor);

    cmd.bubble('redraw');
  };
  _.createBlocks = function() {
    var cmd = this,
      prev = 0,
      numBlocks = cmd.numBlocks(),
      blocks = cmd.blocks = Array(numBlocks);
    for (var i = 0; i < numBlocks; i += 1) {
      var newBlock = blocks[i] = prev.next = MathBlock();
      newBlock.parent = cmd;
      newBlock.prev = prev;
      newBlock.blur();
      prev = newBlock;
    }
    cmd.firstChild = blocks[0];
    cmd.lastChild = blocks[-1 + numBlocks];
  };
  _.insertAt = function(parent, prev, next) {
    var cmd = this;

    cmd.parent = parent;
    cmd.next = next;
    cmd.prev = prev;

    if (prev)
      prev.next = cmd;
    else
      parent.firstChild = cmd;

    if (next)
      next.prev = cmd;
    else
      parent.lastChild = cmd;

    return cmd;
  };
  _.respace = noop; //placeholder for context-sensitive spacing
  _.placeCursor = function(cursor) {
    //append the cursor to the first empty child, or if none empty, the last one
    cursor.appendTo(this.foldChildren(this.firstChild, function(prev, child) {
      return prev.isEmpty() ? prev : child;
    }));
  };

  // remove()
  _.remove = function() {
    var cmd = this,
        prev = cmd.prev,
        next = cmd.next,
        parent = cmd.parent;

    if (prev)
      prev.next = next;
    else
      parent.firstChild = next;

    if (next)
      next.prev = prev;
    else
      parent.lastChild = prev;

    cmd.jQ.remove();

    (function deleteMe(me) {
      delete MathElement[me.id];
      me.eachChild(deleteMe);
    }(cmd));

    return cmd;
  };

  // methods involved in creating and cross-linking with HTML DOM nodes
  /*
    They all expect an .htmlTemplate like
      '<span>#0</span>'
    or
      '<span><span>#0</span><span>#1</span></span>'

    See html.test.js for more examples.

    Requirements:
    - For each block of the command, there must be exactly one "block content
      marker" of the form '#<number>' where <number> is the 0-based index of the
      block. (Like the LaTeX \newcommand syntax, but with a 0-based rather than
      1-based index, because JavaScript because C because Dijkstra.)
    - The block content marker must be the sole contents of the containing
      element, there can't even be surrounding whitespace, or else we can't
      guarantee sticking to within the bounds of the block content marker when
      mucking with the HTML DOM.
    - The HTML not only must be well-formed HTML (of course), but also must
      conform to the XHTML requirements on tags, specifically all tags must
      either be self-closing (like '<br/>') or come in matching pairs.
      Close tags are never optional.
  */
  _.numBlocks = function() {
    return this.htmlTemplate.match(/#\d+/g).length;
  };
  _.html = function() {
    // Render the entire math subtree rooted at this command, as HTML.
    // Expects .createBlocks() to have been called already, since it uses the
    // .blocks array of child blocks.
    //
    // See html.test.js for example templates and intended outputs.
    //
    // Given an .htmlTemplate as described above,
    // - insert the mathquill-command-id attribute into all top-level tags,
    //   which will be used to set this.jQ in .jQize().
    //   This is straightforward:
    //     * tokenize into tags and non-tags
    //     * loop through top-level tokens:
    //         * add #cmdId attribute macro to top-level self-closing tags
    //         * else add #cmdId attribute macro to top-level open tags
    //             * skip the matching top-level close tag and all tag pairs
    //               in between
    // - for each block content marker,
    //     + replace it with the contents of the corresponding block,
    //       rendered as HTML
    //     + insert the mathquill-block-id attribute into the containing tag
    //   This is even easier, a quick regex replace, since block tags cannot
    //   contain anything besides the block content marker.
    //
    // Two notes:
    // - The outermost loop through top-level tokens should never encounter any
    //   top-level close tags, because we should have first encountered a
    //   matching top-level open tag, all inner tags should have appeared in
    //   matching pairs and been skipped, and then we should have skipped the
    //   close tag in question.
    // - All open tags should have matching close tags, which means our inner
    //   loop should always encounter a close tag and drop nesting to 0. If
    //   a close tag is missing, the loop will continue until i >= tokens.length
    //   and token becomes undefined. This will not infinite loop, even in
    //   production without pray(), because it will then TypeError on .slice().

    var cmd = this,
      blocks = cmd.blocks,
      cmdId = ' mathquill-command-id=' + cmd.id,
      tokens = cmd.htmlTemplate.match(/<[^<>]+>|[^<>]+/g);
    pray('no unmatched angle brackets', tokens.join('') === this.htmlTemplate);

    // add cmdId to all top-level tags
    for (var i = 0, token = tokens[0]; token; i += 1, token = tokens[i]) {
      // top-level self-closing tags
      if (token.slice(-2) === '/>') tokens[i] = token.slice(0,-2) + cmdId + '/>';
      // top-level open tags
      else if (token.charAt(0) === '<') {
        pray('not an unmatched top-level close tag', token.charAt(1) !== '/');

        tokens[i] = token.slice(0,-1) + cmdId + '>';

        // skip matching top-level close tag and all tag pairs in between
        var nesting = 1;
        do {
          i += 1, token = tokens[i];
          pray('no missing close tags', token);
          // close tags
          if (token.slice(0,2) === '</') nesting -= 1;
          // non-self-closing open tags
          else if (token.charAt(0) === '<' && token.slice(-2) !== '/>') nesting += 1;
        } while (nesting > 0);
      }
    }
    return tokens.join('').replace(/>#(\d+)/g, function($0, $1) {
      return ' mathquill-block-id=' + blocks[$1].id + '>' + blocks[$1].join('html');
    });
  };
  _.jQize = function() {
    // Sets the .jQ of the entire math subtree rooted at this command.
    // Expects .createBlocks() to have been called already, since it
    // calls .html().
    $(this.html()).find('*').andSelf().each(function() {
      var jQ = $(this),
        cmdId = jQ.attr('mathquill-command-id'),
        blockId = jQ.attr('mathquill-block-id');
      if (cmdId) MathElement[cmdId].jQadd(jQ);
      if (blockId) MathElement[blockId].jQadd(jQ);
    });
  };

  // methods to export a string representation of the math tree
  _.latex = function() {
    return this.foldChildren(this.ctrlSeq, function(latex, child) {
      return latex + '{' + (child.latex() || ' ') + '}';
    });
  };
  _.textTemplate = [''];
  _.text = function() {
    var i = 0;
    return this.foldChildren(this.textTemplate[i], function(text, child) {
      i += 1;
      var child_text = child.text();
      if (text && this.textTemplate[i] === '('
          && child_text[0] === '(' && child_text.slice(-1) === ')')
        return text + child_text.slice(1, -1) + this.textTemplate[i];
      return text + child.text() + (this.textTemplate[i] || '');
    });
  };
}