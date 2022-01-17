function animate(){if(typeof window.onwebkittransitionend!=='undefined')
transitionevent=joEvent.on(newchild,"webkitTransitionEnd",cleanup,self);else
joDefer(cleanup,this,200);if(newclass&&newchild)
joDOM.removeCSSClass(newchild,newclass);if(oldclass&&oldchild)
joDOM.addCSSClass(oldchild,oldclass);}