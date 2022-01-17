function (index, node) {
            var admNode, editable,
                adm = window.parent.ADM,
                bw = window.parent.BWidget;

            if (adm && bw) {
                admNode = adm.getDesignRoot()
                    .findNodeByUid($(node).attr('data-uid')),
                editable = admNode && admNode.isEditable();

                if (editable && typeof(editable) === 'object') {
                    if (editable.selector &&
                        $(editable.selector,node).length) {
                        node = $(editable.selector,node)[0];
                    }
                    // LABELs don't cause blur when we focuse them, and they
                    // never match the ':focus' pseudo selector, so we must
                    // wrap their textContents in a span so we can get the
                    // desired focus and tabindex behaviors
                    if (node.nodeName === "LABEL") {
                        node = $(node).wrapInner('<span>').find('span');
                    }
                    $(node).addClass('adm-text-content');
                    // Set the tabindex explicitly, and ordered...
                    $(node).attr('tabindex',index+1);

                    // Bind double-click handler
                    $(node).dblclick(function(e) {
                        var rng= document.createRange && document.createRange(),
                            sel= window.getSelection && window.getSelection();

                        // enable editing...
                        enableEditing(e.target);

                        // pre-select the text contents/value
                        if (e.target.select) {   // Text input/area
                            e.target.select();
                        } else if (rng && sel) { // Everything else
                            rng.selectNodeContents(e.target);
                            sel.removeAllRanges();
                            sel.addRange(rng);
                        }

                        // TODO: Set timeout to capture edits?
                    });

                    // Bind blur handler
                    // When focus is lost, unset contentEditable and save
                    $(node).blur(admNode, function(e) {
                        var editable = e && e.data && e.data.isEditable(),
                            prop, text;

                        if (!e.data || !editable) return;

                        if (this.contentEditable === 'true') {
                            text = getTextNodeContents(e.target);
                            prop = editable.propertyName;

                            // Only update if values differ
                            if (e.data.getProperty(prop) !== text) {
                                if (!e.data.setProperty(prop,text).result) {
                                    // Revert if setProperty fails
                                    setTextNodeContents(e.target,
                                        e.data.getProperty(prop));
                                }
                            }

                            // Turn off editing...
                            disableEditing(e.target);
                        }
                    });
                }
            }
        }