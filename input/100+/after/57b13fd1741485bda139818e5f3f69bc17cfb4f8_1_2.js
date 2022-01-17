function(codedStr) {
  codedStr = codedStr.replace(/\*/g, '[]');

  var self = {};
  self.tag = '_foo';
  self.ranges = {};

  // set up self.ranges
  var curNode = document.createDocumentFragment();
  var starts = [];
  for(var i=0; i<codedStr.length; i++) {
    var c = codedStr.charAt(i);
    if (/[A-Z]/.test(c)) {
      // open range
      starts.push([curNode, curNode.childNodes.length]);
    } else if (/[a-z]/.test(c)) {
      // close range
      var start = starts.pop();
      var range =
            new Meteor.ui._LiveRange(
              self.tag, start[0].childNodes[start[1]],
              start[0].lastChild);
      range.letter = c.toUpperCase();
      self.ranges[range.letter] = range;
    } else if (c === '[') {
      curNode.appendChild(document.createElement("DIV"));
      curNode = curNode.lastChild;
    } else if (c === ']') {
      // close node
      curNode = curNode.parentNode;
    }
  }

  self.frag = curNode;

  self.path = function(/*args*/) {
    var node = self.frag;
    _.each(arguments, function(i) {
      node = node.childNodes[i];
    });
    return node;
  };

  self.findRange = function(node) {
    return Meteor.ui._LiveRange.findRange(self.tag, node);
  };

  self.currentString = function() {
    var buf = [];
    var tempRange = new Meteor.ui._LiveRange(self.tag, self.frag);
    tempRange.visit(function(is_start, range) {
      buf.push(is_start ?
               range.letter.toUpperCase() :
               range.letter.toLowerCase());
    }, function(is_start, node) {
      buf.push(is_start ? '[' : ']');
    });
    tempRange.destroy();

    return buf.join('').replace(/\[\]/g, '*');
  };

  return self;
}