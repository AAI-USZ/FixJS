function () {
// Contents.

function addContent(index) {
  var c = content.cloneNode();
  c.removeAttribute('id');
  return c;
}

function switchToContent(index) {
  flux.innerHTML = '';
  flux.appendChild(getCtx(index).content);
}


// Tabs are here.
function addTab(tabName, index) {
  index = index || 0;
  var newTab = tab.cloneNode();
  newTab.removeAttribute('id');
  newTab.setAttribute('class', 'tab');
  newTab.textContent = tabName;
  var children = tabs.childNodes;
  var chosenIndex = index;
  if (index >= children.length) {
    chosenIndex = children.length - 1;
  }
  newTab.onclick = function () {
    selectTab(chosenIndex);
  };
  tabs.insertBefore(newTab, children[chosenIndex]);
  return index;
}

function selectTab(index) {
  var children = tabs.childNodes;
  children[index].className = 'tab selected';
  if (currentCtx !== null) {
    children[currentCtx.index].className = 'tab';
  }
  currentCtx = getCtx(index);
  switchToContent(index);
}

var contexts = [];
var currentCtx = null;

function getCtx(index) {
  for (var i = 0; i < contexts.length; i++) {
    if (contexts[i].index === index) {
      return contexts[i];
    }
  }
  return null;
}

function Context(type, name) {
  if (!(this instanceof Context)) return new Context(type, name);
  this.type = type || '';
  this.name = name;

  contexts.push(this);
  this.index = addTab(name, contexts.length - 1);

  // Content creation.
  this.content = addContent(this.index);

  selectTab(this.index);
}

// A message is:
// {
//   type: 'say',
//   content: 'something…',
// }
Context.prototype.send = function(msg) {
  this.content.textContent += msg.content + '\n';
};


// Listen.

var listeners = [];
function triggerListen() {
  for (var i = 0; i < listeners.length; i++) {
    listeners[i](msg.value, currentCtx);
  }
}

function listen(cb) {
  listeners.push(cb);
}

onload = function () {
  Context('', 'login');
  Context('', 'room');
  selectTab(1);
  Context('', 'more');
};


//API
window.addTab = addTab;
window.selectTab = selectTab;
window.listen = listen;
window.Context = Context;
window.triggerListen = triggerListen;

}