function(target, parent, nextSibling, removal)
    {
        if (FBTrace.DBG_HTML)
            FBTrace.sysout("html.mutateNode target:" + target + " parent:" + parent +
                (removal ? "REMOVE" : ""));

        // Due to the delay call this may or may not exist in the tree anymore
        if (!removal && !this.ioBox.isInExistingRoot(target))
        {
            if (FBTrace.DBG_HTML)
                FBTrace.sysout("mutateNode: different tree " + target, target);
            return;
        }

        this.markChange();  // This invalidates the panels for every mutate

        var parentNodeBox = Firebug.scrollToMutations || Firebug.expandMutations
            ? this.ioBox.createObjectBox(parent)
            : this.ioBox.findObjectBox(parent);

        if (FBTrace.DBG_HTML)
            FBTrace.sysout("html.mutateNode parent:" + parent + " parentNodeBox:" +
                parentNodeBox);

        if (!parentNodeBox)
            return;

        if (!Firebug.showTextNodesWithWhitespace && this.isWhitespaceText(target))
            return;

        // target is only whitespace

        var newParentTag = getNodeTag(parent);
        var oldParentTag = getNodeBoxTag(parentNodeBox);

        if (newParentTag == oldParentTag)
        {
            if (parentNodeBox.populated)
            {
                if (removal)
                {
                    this.ioBox.removeChildBox(parentNodeBox, target);

                    this.highlightMutation(parentNodeBox, parentNodeBox, "mutated");
                }
                else
                {
                    var childBox = this.ioBox.getChildObjectBox(parentNodeBox);

                    var comments = Firebug.showCommentNodes;
                    var whitespaces = Firebug.showTextNodesWithWhitespace;

                    // Get the right next sibling that match following criteria:
                    // 1) It's not a whitespace text node in case 'show whitespaces' is false.
                    // 2) It's not a comment in case 'show comments' is false.
                    // 3) There is a child box already created for it in the HTML panel UI.
                    // The new node will then be inserted before that sibling's child box, or
                    // appended at the end (issue 5255).
                    while (nextSibling && (
                       (!whitespaces && HTMLLib.isWhitespaceText(nextSibling)) ||
                       (!comments && nextSibling instanceof window.Comment) ||
                       (!this.ioBox.findChildObjectBox(childBox, nextSibling))))
                    {
                       nextSibling = this.findNextSibling(nextSibling);
                    }

                    var objectBox = nextSibling ?
                        this.ioBox.insertChildBoxBefore(parentNodeBox, target, nextSibling) :
                        this.ioBox.appendChildBox(parentNodeBox, target);

                    if (this.selection && (!this.selection.parentNode || parent == this.selection))
                    {
                        // If the editing mode is currently active, remember the target mutation.
                        // The mutation is coming from user changes and will be selected as soon
                        // as editing is finished. Only HTMLElement can be selected (not a simple
                        // text node).
                        // See issue 5506
                        if (this.isEditing() && (target instanceof window.HTMLElement))
                            this.nextSelection = target;
                    }

                    this.highlightMutation(objectBox, objectBox, "mutated");
                }
            }
            else // !parentNodeBox.populated
            {
                var newParentNodeBox = newParentTag.replace({object: parent}, this.document);
                parentNodeBox.parentNode.replaceChild(newParentNodeBox, parentNodeBox);

                if (this.selection && (!this.selection.parentNode || parent == this.selection))
                    this.ioBox.select(parent, true);

                this.highlightMutation(newParentNodeBox, newParentNodeBox, "mutated");

                if (!removal && (Firebug.scrollToMutations || Firebug.expandMutations))
                {
                    var objectBox = this.ioBox.createObjectBox(target);
                    this.highlightMutation(objectBox, objectBox, "mutated");
                }
            }
        }
        else // newParentTag != oldParentTag
        {
            var newParentNodeBox = newParentTag.replace({object: parent}, this.document);
            if (parentNodeBox.parentNode)
                parentNodeBox.parentNode.replaceChild(newParentNodeBox, parentNodeBox);

            if (Css.hasClass(parentNodeBox, "open"))
                this.ioBox.toggleObjectBox(newParentNodeBox, true);

            if (this.selection && (!this.selection.parentNode || parent == this.selection))
                this.ioBox.select(parent, true);

            this.highlightMutation(newParentNodeBox, newParentNodeBox, "mutated");

            if (!removal && (Firebug.scrollToMutations || Firebug.expandMutations))
            {
                var objectBox = this.ioBox.createObjectBox(target);
                this.highlightMutation(objectBox, objectBox, "mutated");
            }
        }
    }