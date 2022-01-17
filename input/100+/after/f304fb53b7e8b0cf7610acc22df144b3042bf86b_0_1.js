function(element, top)
    {
        var nodeName  = element.nodeName.toLowerCase();
        var inputType = nodeName;
        if (inputType === 'input') {
            inputType = element.getAttribute('type');
        }

        var isNoLabelControl = false;
        if (/^(submit|reset|image|hidden|button)$/.test(inputType) === true) {
            isNoLabelControl = true;
        }

        this._labelNames = {};
        var labels = top.getElementsByTagName('label');
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].hasAttribute('for') === true) {
                var labelFor = labels[i].getAttribute('for');
                this._labelNames[labelFor] = labels[i];
            }//end if
        }//end for

        if ((element.hasAttribute('id') === false) && (isNoLabelControl === false)) {
            // There is no id attribute at all on the control.
            if (element.hasAttribute('title') === true) {
                if (/^\s*$/.test(element.getAttribute('title')) === true) {
                    // But the title attribute is empty. Whoops.
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.', 'H65.3');
                }
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an ID, therefore it cannot have an explicit label.', 'H44.NoId');
            }//end if
        } else {
            var id = element.getAttribute('id');
            if (!this._labelNames[id]) {
                // There is no label for this form control. For certain types of
                // input, "no label" is not an error.
                if (isNoLabelControl === false) {
                    // If there is a title, we presume that H65 applies - the label
                    // element cannot be used, and the title should be used as the
                    // descriptive label instead.
                    if (element.hasAttribute('title') === true) {
                        if (/^\s*$/.test(element.getAttribute('title')) === true) {
                            // But the title attribute is empty. Whoops.
                            HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.', 'H65.3');
                        } else {
                            // Manual check required as to the title. Making this a
                            // warning because a manual tester also needs to confirm
                            // that a label element is not feasible for the control.
                            HTMLCS.addMessage(HTMLCS.WARNING, element, 'Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.', 'H65');
                        }
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'Form control does not have an explicit label or title attribute, identifying the purpose of the control.', 'H44.2');
                    }
                }
            } else {
                // There is a label for a form control that should not have a label,
                // because the label is provided through other means (value of select
                // reset, alt on image submit, button's content), or there is no
                // visible field (hidden).
                if (isNoLabelControl === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, element, 'Label element should not be used for this type of form control.', 'H44.NoLabelAllowed');
                } else {
                    var labelOnRight = false;
                    if (/^(checkbox|radio)$/.test(inputType) === true) {
                        labelOnRight = true;
                    }

                    // Work out the position of the element in comparison to its
                    // label. A positive number means the element comes after the
                    // label (correct where label is on left). Negative means element
                    // is before the label (correct for "label on right").
                    if (element.compareDocumentPosition) {
                        // Firefox, Opera, IE 9+ standards mode.
                        var pos = element.compareDocumentPosition(this._labelNames[id]);
                        if ((pos & 0x02) === 0x02) {
                            // Label precedes element.
                            var posDiff = 1;
                        } else if ((pos & 0x04) === 0x04) {
                            // Label follows element.
                            var posDiff = -1;
                        }
                    } else if (element.sourceIndex) {
                        // IE < 9.
                        var posDiff = element.sourceIndex - this._labelNames[id].sourceIndex;
                    }

                    if ((labelOnRight === true) && (posDiff > 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed after this element.', 'H44.1.After');
                    } else if ((labelOnRight === false) && (posDiff < 0)) {
                        HTMLCS.addMessage(HTMLCS.ERROR, element, 'The label element for this control should be placed before this element.', 'H44.1.Before');
                    }
                }//end if
            }//end if
        }//end if
    }