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
  // They all expect an .htmlTemplate like
  //   '<span #mqCmdId #mqBlockId:0>#mqBlock:0</span>'
  // or
  //   '<span #mqCmdId><span #mqBlockId:0>#mqBlock:0</span><span #mqBlockId:1>#mqBlock:1</span></span>'.
  // Specifically,
  // - all top-level tags must have a #mqCmdId attribute macro, which
  //   will be set in order as the .jQ of this command
  // - for each block of the command,
  //     + there should be exactly one tag with a #mqBlockId:_ attribute
  //       macro, where _ is the 0-based-index of the block
  //     + and exactly one #mqBlock:_ include macro, which will be
  //       replaced with the contents of the block
  _.numBlocks = function() {
    return this.htmlTemplate.match(/#mqBlock:(\d+)/g).length;
  };
  _.html = function() {
    // Renders the entire math subtree rooted at this command as HTML.
    // Expects .createBlocks() to have been called already.
    var cmd = this;
    return (cmd.htmlTemplate
      .replace(/#mqCmdId\b/g, 'mathquill-command-id=' + cmd.id)
      .replace(/#mqBlockId:(\d+)/g, function($0, $1) {
        return 'mathquill-block-id=' + cmd.blocks[$1].id;
      })
      .replace(/#mqBlock:(\d+)/g, function($0, $1) {
        return cmd.blocks[$1].join('html');
      })
    );
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