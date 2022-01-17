function(stack, object) {
    if (!object) {
      object = stack;
      stack = this.getStack().getName();
    }
    if (!object) return this;

    this.hideIndicator();

    var rotated = false;
    if (!this.isCurrentStack(stack)) {
      if (this._current) this.getCurrentView().fireEvent('hide', ['left']);
      rotated = true;
      this.rotate(stack);
    }

    object.setURL(History.getPath());

    var current = this._current;
    var isImmediate = rotated;
    var direction = current.hasObject(object) ? 'left' : 'right';
    var previous;
    if (!isImmediate) previous = this.getCurrentView().rememberScroll();

    current.push(object);
    if (previous) previous.fireEvent('hide', [direction]);

    var options = {
      immediate: isImmediate,
      direction: direction
    };

    this.updateElement('back', options, object.getBackTemplate())
      .updateElement('title', options, object.getTitleTemplate())
      .updateElement('action', options, object.getActionTemplate());

    UI.disable();

    object.fireEvent('show', [direction]);

    UI.transition(this.element, previous && previous.toElement(), object.render(), {
      immediate: isImmediate,
      direction: direction,
      onTransitionEnd: this.bound('onTransitionEnd')
    });

    object.revertScrollTop();

    return this;
  }