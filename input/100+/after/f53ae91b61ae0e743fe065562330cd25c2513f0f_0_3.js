function (nodes) {
  if (this.useStream) throw new Error('the .container method is already called');
  this.useStream = true;

  // Note this is Nodes not tree elemenents
  nodes = Array.prototype.concat.apply([], nodes);

  // do nothing if nodes was empty
  if (nodes.length === 0) return;

  var topLevel = [];
  var length = nodes.length;
  var i = length, j, node, pos, check;

  loop:while (i--) {
    node = nodes[i].elem;
    pos = {
      start: node.pos.beforebegin,
      end: node.singleton ? (node.pos.beforebegin + node.pos.afterbegin) : node.pos.beforeend
    };

    j = length;
    while (j--) {
      check = nodes[j].elem;

      // if node is inside another container (check), do not threat it as an container

      // the node can not be inside a singelton element
      if (check.singelton) continue;

      if (check.pos.beforebegin < pos.start && check.pos.beforeend > pos.end) {
        continue loop;
      }
    }

    topLevel.push(nodes[i]);
  }

  // do nothing if nodes was empty
  if (topLevel.length === 0) return;

  // sort top level nodes, so first tag is fist item
  topLevel = topLevel.sort(function sortfunction(a, b){
    return (a.elem.pos.beforebegin - b.elem.pos.beforebegin);
  });

  // Add containers
  var container = this.containers;
  container.push.apply(container, topLevel);

  // setup all contaners and there children,
  // so modification is allowed
  length = topLevel.length;
  i = length;
  while (i--) {
    node = topLevel[i];
    node.isContainer = true;
    node.elem.modify = true;
    node._childModify(true);
  }

  // send first chunk
  this.nextPos = topLevel[0].elem.pos.beforebegin;
  if (!this.paused) this.resume();
}