function cleanup(){if(oldchild){joDOM.removeCSSClass(oldchild,"next");joDOM.removeCSSClass(oldchild,"prev");self.removeChild(oldchild);}
if(newchild){if(transitionevent)
joEvent.remove(newchild,"webkitTransitionEnd",transitionevent);joDOM.removeCSSClass(newchild,"next");joDOM.removeCSSClass(newchild,"prev");}}