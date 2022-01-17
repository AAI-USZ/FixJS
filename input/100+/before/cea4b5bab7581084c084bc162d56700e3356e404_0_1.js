function (event) {
    var type = event.type;
    var target = event.target || event.srcElement;
    var dom = this.dom;
    var node = this;
    var expandable = (this.type == 'array' || this.type == 'object');

    // value events
    var domValue = dom.value;
    if (target == domValue) {
        switch (type) {
            case 'focus':
                JSONEditor.focusNode = this;
                break;

            case 'change':
            case 'blur':
            case 'keyup':
                this._getDomValue(true);
                this._updateDomValue();
                break;

            case 'cut':
            case 'paste':
                setTimeout(function () {
                    node._getDomValue(true);
                    node._updateDomValue();
                }, 1);
                break;
        }
    }

    // field events
    var domField = dom.field;
    if (target == domField) {
        switch (type) {
            case 'focus':
                JSONEditor.focusNode = this;
                break;

            case 'change':
            case 'blur':
            case 'keyup':
                this._getDomField(true);
                this._updateDomField();
                break;

            case 'cut':
            case 'paste':
                setTimeout(function () {
                    node._getDomField(true);
                    node._updateDomField();
                }, 1);
                break;
        }
    }

    // drag events
    var domDrag = dom.drag;
    if (target == domDrag) {
        switch (type) {
            case 'mousedown':
                this._onDragStart(event);
                break;
            case 'mouseover':
                this.setHighlight(true);
                break;
            case 'mouseout':
                this.setHighlight(false);
                break;
        }
    }

    // expand events
    var domExpand = dom.expand;
    if (target == domExpand) {
        if (type == 'click') {
            if (expandable) {
                this._onExpand(event);
            }
        }
    }

    // duplicate button
    var domDuplicate = dom.duplicate;
    if (target == domDuplicate) {
        switch (type) {
            case 'click':
                this.parent._duplicate(this);
                break;
            case 'mouseover':
                this.setHighlight(true);
                break;
            case 'mouseout':
                this.setHighlight(false);
                break;
        }
    }

    // remove button
    var domRemove = dom.remove;
    if (target == domRemove) {
        switch (type) {
            case 'click':
                this.parent.removeChild(this);
                break;
            case 'mouseover':
                this.setHighlight(true);
                break;
            case 'mouseout':
                this.setHighlight(false);
                break;
        }
    }

    // type button
    var domType = dom.type;
    if (target == domType) {
        switch (type) {
            case 'click':
                this._onTypeButton(event);
                break;
            case 'mouseover':
                this.setHighlight(true);
                break;
            case 'mouseout':
                this.setHighlight(false);
                break;
        }
    }

    // focus
    // when clicked in whitespace left or right from the field or value, set focus
    var domTree = dom.tree;
    if (target == domTree.parentNode) {
        switch (type) {
            case 'click':
                var left = (event.offsetX != undefined) ?
                    (event.offsetX < (this.getLevel() + 1) * 24) :
                    (event.clientX < JSONEditor.getAbsoluteLeft(dom.tdSeparator));// for FF
                if (left || expandable) {
                    // node is expandable when it is an object or array
                    if (domField) {
                        JSONEditor.setEndOfContentEditable(domField);
                        domField.focus();
                    }
                }
                else {
                    if (domValue) {
                        JSONEditor.setEndOfContentEditable(domValue);
                        domValue.focus();
                    }
                }
                break;
        }
    }

    if ((target == dom.tdExpand && !expandable) || target == dom.tdField || target == dom.tdSeparator) {
        switch (type) {
            case 'click':
                if (domField) {
                    JSONEditor.setEndOfContentEditable(domField);
                    domField.focus();
                }
                break;
        }
    }
}