function(textBox, completionBox, options)
{
    var popupSize = 40;

    this.textBox = textBox;
    this.options = options;

    this.completionBox = completionBox;
    this.popupTop = this.popupBottom = null;

    this.completionBase = {
        pre: null,
        expr: null,
        candidates: []
    };
    this.completions = null;

    this.revertValue = null;

    this.showCompletionPopup = options.showCompletionPopup;
    this.completionPopup = options.completionPopup;
    this.selectedPopupElement = null;

    /**
     * If a completion was just performed, revert it. Otherwise do nothing.
     * Returns true iff the completion was reverted.
     */
    this.revert = function(context)
    {
        if (this.revertValue === null)
            return false;

        this.textBox.value = this.revertValue;
        var len = this.textBox.value.length;
        setCursorToEOL(this.textBox);

        this.complete(context);
        return true;
    };

    /**
     * Hide completions temporarily, so they show up again on the next key press.
     */
    this.hide = function()
    {
        this.completionBase = {
            pre: null,
            expr: null,
            candidates: []
        };
        this.completions = null;

        this.showCompletions(false);
    };

    /**
     * Hide completions for this expression (/completion base). Appending further
     * characters to the variable name will not make completions appear, but
     * adding, say, a semicolon and typing something else will.
     */
    this.hideForExpression = function()
    {
        this.completionBase.candidates = [];
        this.completions = null;

        this.showCompletions(false);
    };

    /**
     * Check whether it would be acceptable for the return key to evaluate the
     * expression instead of completing things.
     */
    this.acceptReturn = function()
    {
        if (!this.completions)
            return true;

        if (this.getCompletionValue() === this.textBox.value)
        {
            // The user wouldn't see a difference if we completed. This can
            // happen for example if you type 'alert' and press enter,
            // regardless of whether or not there exist other completions.
            return true;
        }

        return false;
    };

    /**
     * Show completions for the current contents of the text box. Either this or
     * hide() must be called when the contents change.
     */
    this.complete = function(context)
    {
        this.revertValue = null;
        this.createCandidates(context);
        this.showCompletions(false);
    };

    /**
     * Update the completion base and create completion candidates for the
     * current value of the text box.
     */
    this.createCandidates = function(context)
    {
        var offset = this.textBox.selectionStart;
        if (offset !== this.textBox.value.length)
        {
            this.hide();
            return;
        }

        var value = this.textBox.value;

        // Create a simplified expression by redacting contents/normalizing
        // delimiters of strings and regexes, to make parsing easier.
        // Give up if the syntax is too weird.
        var svalue = simplifyExpr(value);
        if (svalue === null)
        {
            this.hide();
            return;
        }

        if (killCompletions(svalue, value))
        {
            this.hide();
            return;
        }

        // Find the expression to be completed.
        var parseStart = getExpressionOffset(svalue);
        var parsed = value.substr(parseStart);
        var sparsed = svalue.substr(parseStart);

        // Find which part of it represents the property access.
        var propertyStart = getPropertyOffset(sparsed);
        var prop = parsed.substring(propertyStart);
        var spreExpr = sparsed.substr(0, propertyStart);
        var preExpr = parsed.substr(0, propertyStart);

        this.completionBase.pre = value.substr(0, parseStart);

        if (FBTrace.DBG_COMMANDLINE)
        {
            var sep = (parsed.indexOf("|") > -1) ? "^" : "|";
            FBTrace.sysout("Completing: " + this.completionBase.pre + sep + preExpr + sep + prop);
        }

        // We only need to calculate a new candidate list if the expression has
        // changed (we can ignore this.completionBase.pre since completions do not
        // depend upon that).
        if (preExpr !== this.completionBase.expr)
        {
            this.completionBase.expr = preExpr;
            this.completionBase.candidates = autoCompleteEval(context, preExpr, spreExpr,
                this.options.includeCurrentScope);
        }

        this.createCompletions(prop);
    };

    /**
     * From a valid completion base, create a list of completions (containing
     * those completion candidates that share a (sometimes case-insensitive)
     * prefix with the user's input) and a default completion.
     */
    this.createCompletions = function(prefix)
    {
        var candidates = this.completionBase.candidates;
        var valid = [], ciValid = [];

        if (!this.completionBase.expr && !prefix)
        {
            // Don't complete "".
            this.completions = null;
            return;
        }

        var lowPrefix = prefix.toLowerCase();
        for (var i = 0; i < candidates.length; ++i)
        {
            // Mark a candidate as matching if it matches the prefix case-
            // insensitively, and shares its upper-case characters.
            var name = candidates[i];
            if (!Str.hasPrefix(name.toLowerCase(), lowPrefix))
                continue;

            var fail = false;
            for (var j = 0; j < prefix.length; ++j)
            {
                var ch = prefix.charAt(j);
                if (ch !== ch.toLowerCase() && ch !== name.charAt(j))
                {
                    fail = true;
                    break;
                }
            }
            if (!fail)
            {
                ciValid.push(name);
                if (Str.hasPrefix(name, prefix))
                    valid.push(name);
            }
        }

        if (ciValid.length > 0)
        {
            // If possible, default to a candidate matching the case by picking
            // a default from 'valid' and correcting its index.
            var hasMatchingCase = (valid.length > 0);

            this.completions = {
                list: (hasMatchingCase ? valid : ciValid),
                prefix: prefix
            };
            this.pickDefaultCandidate();

            if (hasMatchingCase)
            {
                var find = valid[this.completions.index];
                this.completions = {
                    list: ciValid,
                    prefix: prefix,
                    index: ciValid.indexOf(find)
                };
            }
        }
        else
        {
            this.completions = null;
        }
    };

    /**
     * Chose a default candidate from the list of completions. This is currently
     * selected as the shortest completion, to make completions disappear when
     * typing a variable name that is also the prefix of another.
     */
    this.pickDefaultCandidate = function()
    {
        var pick = 0;
        var ar = this.completions.list;
        for (var i = 1; i < ar.length; i++)
        {
            if (ar[i].length < ar[pick].length)
                pick = i;
        }
        this.completions.index = pick;
    };

    /**
     * Go backward or forward by some number of steps in the list of completions.
     * dir is the relative movement in the list (negative for backwards movement).
     */
    this.cycle = function(dir, clamp)
    {
        var ind = this.completions.index + dir;
        if (clamp)
            ind = Math.max(Math.min(ind, this.completions.list.length - 1), 0);
        else if (ind >= this.completions.list.length)
            ind = 0;
        else if (ind < 0)
            ind = this.completions.list.length - 1;
        this.completions.index = ind;
        this.showCompletions(true);
    };

    /**
     * Get the property name that is currently selected as a completion (or
     * null if there is none).
     */
    this.getCurrentCompletion = function()
    {
        return (this.completions ? this.completions.list[this.completions.index] : null);
    };

    /**
     * See if we have any completions.
     */
    this.hasCompletions = function()
    {
        return !!this.completions;
    };

    /**
     * Get the value the completion box should have for some value of the
     * text box and a selected completion.
     */
    this.getCompletionBoxValue = function()
    {
        var completion = this.getCurrentCompletion();
        if (completion === null)
            return "";
        var userTyped = this.textBox.value;
        var value = this.completionBase.pre + this.completionBase.expr + completion;
        return userTyped + value.substr(userTyped.length);
    };

    /**
     * Update the completion box and popup to be consistent with the current
     * state of the auto-completer. If just cycling, the old scolling state
     * for the popup is preserved.
     */
    this.showCompletions = function(cycling)
    {
        this.completionBox.value = this.getCompletionBoxValue();

        var show = this.showCompletionPopup ||
            (this.completionPopup && this.completionPopup.state === "open");
        if (show && this.completions && this.completions.list.length > 1)
            this.popupCandidates(cycling);
        else
            this.closePopup();
    };

    /**
     * Handle a keypress event. Returns true if the auto-completer used up
     * the event and does not want it to propagate further.
     */
    this.handleKeyPress = function(event, context)
    {
        var clearedTabWarning = this.clearTabWarning();

        if (Events.isAlt(event))
            return false;

        if (event.keyCode === KeyEvent.DOM_VK_TAB &&
            !Events.isControl(event) && !Events.isControlShift(event) &&
            this.textBox.value !== "")
        {
            if (this.completions)
            {
                this.acceptCompletion();
                Events.cancelEvent(event);
                return true;
            }
            else if (this.options.tabWarnings)
            {
                if (clearedTabWarning)
                {
                    // Send tab along if the user was warned.
                    return false;
                }

                this.setTabWarning();
                Events.cancelEvent(event);
                return true;
            }
        }
        else if (event.keyCode === KeyEvent.DOM_VK_RETURN && !this.acceptReturn())
        {
            // Completion on return, when one is user-visible.
            this.acceptCompletion();
            Events.cancelEvent(event);
            return true;
        }
        else if (event.keyCode === KeyEvent.DOM_VK_RIGHT && this.completions &&
            this.textBox.selectionStart === this.textBox.value.length)
        {
            // Complete on right arrow at end of line.
            this.acceptCompletion();
            Events.cancelEvent(event);
            return true;
        }
        else if (event.keyCode === KeyEvent.DOM_VK_ESCAPE)
        {
            if (this.completions)
            {
                this.hideForExpression();
                Events.cancelEvent(event);
                return true;
            }
            else
            {
                // There are no visible completions, but we might still be able to
                // revert a recently performed completion.
                if (this.revert(context))
                {
                    Events.cancelEvent(event);
                    return true;
                }
            }
        }
        else if (event.keyCode === KeyEvent.DOM_VK_UP ||
            event.keyCode === KeyEvent.DOM_VK_DOWN)
        {
            if (this.completions)
            {
                this.cycle(event.keyCode === KeyEvent.DOM_VK_UP ? -1 : 1, false);
                Events.cancelEvent(event);
                return true;
            }
        }
        else if (event.keyCode === KeyEvent.DOM_VK_PAGE_UP ||
            event.keyCode === KeyEvent.DOM_VK_PAGE_DOWN)
        {
            if (this.completions)
            {
                this.pageCycle(event.keyCode === KeyEvent.DOM_VK_PAGE_UP ? -1 : 1);
                Events.cancelEvent(event);
                return true;
            }
        }
        else if (event.keyCode === KeyEvent.DOM_VK_HOME ||
            event.keyCode === KeyEvent.DOM_VK_END)
        {
            if (this.isPopupOpen())
            {
                this.topCycle(event.keyCode === KeyEvent.DOM_VK_HOME ? -1 : 1);
                Events.cancelEvent(event);
                return true;
            }
        }
        return false;
    };

    /**
     * Handle a keydown event.
     */
    this.handleKeyDown = function(event, context)
    {
        if (event.keyCode === KeyEvent.DOM_VK_ESCAPE && this.completions)
        {
            // Close the completion popup on escape in keydown, so that the popup
            // does not close itself and prevent event propagation on keypress.
            // (Unless the popup is only open due to Ctrl+Space, in which case
            // that's precisely what we want.)
            if (this.showCompletionPopup)
                this.closePopup();
        }
        else if (event.keyCode === KeyEvent.DOM_VK_SPACE && Events.isControl(event))
        {
            // Force-show the completion popup.
            if (!this.completions)
            {
                // If completions have been hidden, show them again.
                this.hide();
                this.complete(context);
            }
            if (this.completionPopup && this.completions)
                this.popupCandidates(false);
        }
    };

    this.clearTabWarning = function()
    {
        if (this.tabWarning)
        {
            this.completionBox.value = "";
            delete this.tabWarning;
            return true;
        }
        return false;
    };

    this.setTabWarning = function()
    {
        this.completionBox.value = this.textBox.value + "    " +
            Locale.$STR("firebug.completion.empty");

        this.tabWarning = true;
    };

    /**
     * Get what should be completed to; this is only vaguely related to what is
     * shown in the completion box.
     */
    this.getCompletionValue = function()
    {
        var property = this.getCurrentCompletion();
        var preParsed = this.completionBase.pre, preExpr = this.completionBase.expr;
        var res = preParsed + preExpr + property;

        // Don't adjust index completions.
        if (/^\[['"]$/.test(preExpr.slice(-2)))
            return res;

        if (!isValidProperty(property))
        {
            // The property name is actually invalid in free form, so replace
            // it with array syntax.

            if (preExpr)
            {
                res = preParsed + preExpr.slice(0, -1);
            }
            else
            {
                // Global variable access - assume the variable is a member of 'window'.
                res = preParsed + "window";
            }
            res += '["' + Str.escapeJS(property) + '"]';
        }
        return res;
    };

    /**
     * Accept the current completion into the text box.
     */
    this.acceptCompletion = function()
    {
        var completion = this.getCompletionValue();
        var originalValue = this.textBox.value;
        this.textBox.value = completion;
        setCursorToEOL(this.textBox);

        this.hide();
        this.revertValue = originalValue;
    };

    this.pageCycle = function(dir)
    {
        var list = this.completions.list, selIndex = this.completions.index;

        if (!this.isPopupOpen())
        {
            // When no popup is open, cycle by a fixed amount and stop at edges.
            this.cycle(dir * 15, true);
            return;
        }

        var top = this.popupTop, bottom = this.popupBottom;
        if (top === 0 && bottom === list.length)
        {
            // For a single scroll page, act like home/end.
            this.topCycle(dir);
            return;
        }

        var immediateTarget;
        if (dir === -1)
            immediateTarget = (top === 0 ? top : top + 2);
        else
            immediateTarget = (bottom === list.length ? bottom: bottom - 2) - 1;
        if ((selIndex - immediateTarget) * dir < 0)
        {
            // The selection has not yet reached the edge target, so jump to it.
            selIndex = immediateTarget;
        }
        else
        {
            // Show the next page.
            if (dir === -1 && top - popupSize <= 0)
                selIndex = 0;
            else if (dir === 1 && bottom + popupSize >= list.length)
                selIndex = list.length - 1;
            else
                selIndex = immediateTarget + dir*popupSize;
        }

        this.completions.index = selIndex;
        this.showCompletions(true);
    };

    this.topCycle = function(dir)
    {
        if (dir === -1)
            this.completions.index = 0;
        else
            this.completions.index = this.completions.list.length - 1;
        this.showCompletions(true);
    };

    this.popupCandidates = function(cycling)
    {
        Dom.eraseNode(this.completionPopup);
        this.selectedPopupElement = null;

        var vbox = this.completionPopup.ownerDocument.createElement("vbox");
        this.completionPopup.appendChild(vbox);
        vbox.classList.add("fbCommandLineCompletions");

        var title = this.completionPopup.ownerDocument.
            createElementNS("http://www.w3.org/1999/xhtml","div");
        title.innerHTML = Locale.$STR("console.Use Arrow keys, Tab or Enter");
        title.classList.add("fbPopupTitle");
        vbox.appendChild(title);

        var list = this.completions.list, selIndex = this.completions.index;

        if (this.completions.list.length <= popupSize)
        {
            this.popupTop = 0;
            this.popupBottom = list.length;
        }
        else
        {
            var self = this;
            var setTop = function(val)
            {
                if (val < 0)
                    val = 0;
                self.popupTop = val;
                self.popupBottom = val + popupSize;
                if (self.popupBottom > list.length)
                    setBottom(list.length);
            };
            var setBottom = function(val)
            {
                if (val > list.length)
                    val = list.length;
                self.popupBottom = val;
                self.popupTop = val - popupSize;
                if (self.popupTop < 0)
                    setTop(0);
            };

            if (!cycling)
            {
                // Show the selection at nearly the bottom of the popup, where
                // it is more local.
                setBottom(selIndex + 3);
            }
            else
            {
                // Scroll the popup such that selIndex fits.
                if (selIndex - 2 < this.popupTop)
                    setTop(selIndex - 2);
                else if (selIndex + 3 > this.popupBottom)
                    setBottom(selIndex + 3);
            }
        }

        for (var i = this.popupTop; i < this.popupBottom; i++)
        {
            var completion = list[i];
            var prefixLen = this.completions.prefix.length;

            var hbox = this.completionPopup.ownerDocument.
                createElementNS("http://www.w3.org/1999/xhtml","div");
            hbox.completionIndex = i;

            var pre = this.completionPopup.ownerDocument.
                createElementNS("http://www.w3.org/1999/xhtml","span");
            var preText = this.textBox.value;
            if (prefixLen)
                preText = preText.slice(0, -prefixLen) + completion.slice(0, prefixLen);
            pre.innerHTML = Str.escapeForTextNode(preText);
            pre.classList.add("userTypedText");

            var post = this.completionPopup.ownerDocument.
                createElementNS("http://www.w3.org/1999/xhtml","span");
            var postText = completion.substr(prefixLen);
            post.innerHTML = Str.escapeForTextNode(postText);
            post.classList.add("completionText");

            if (i === selIndex)
                this.selectedPopupElement = hbox;

            hbox.appendChild(pre);
            hbox.appendChild(post);
            vbox.appendChild(hbox);
        }

        if (this.selectedPopupElement)
            this.selectedPopupElement.setAttribute("selected", "true");

        this.completionPopup.openPopup(this.textBox, "before_start", 0, 0, false, false);
    };

    this.isPopupOpen = function()
    {
        return (this.completionPopup && this.completionPopup.state !== "closed");
    };

    this.closePopup = function()
    {
        if (!this.isPopupOpen())
            return;

        try
        {
            this.completionPopup.hidePopup();
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("Firebug.JSAutoCompleter.closePopup; EXCEPTION " + err, err);
        }
    };

    this.getCompletionPopupElementFromEvent = function(event)
    {
        var selected = event.target;
        while (selected && selected.localName !== "div")
            selected = selected.parentNode;

        return (selected && typeof selected.completionIndex !== "undefined" ? selected : null);
    };

    this.popupMousedown = function(event)
    {
        var el = this.getCompletionPopupElementFromEvent(event);
        if (!el)
            return;

        if (this.selectedPopupElement)
            this.selectedPopupElement.removeAttribute("selected");

        this.selectedPopupElement = el;
        this.selectedPopupElement.setAttribute("selected", "true");
        this.completions.index = el.completionIndex;
        this.completionBox.value = this.getCompletionBoxValue();
    };

    this.popupScroll = function(event)
    {
        if (event.axis !== event.VERTICAL_AXIS)
            return;
        if (!this.getCompletionPopupElementFromEvent(event))
            return;
        this.cycle(event.detail, true);
    };

    this.popupClick = function(event)
    {
        var el = this.getCompletionPopupElementFromEvent(event);
        if (!el)
            return;

        this.completions.index = el.completionIndex;
        this.acceptCompletion();
    };

    this.popupMousedown = Obj.bind(this.popupMousedown, this);
    this.popupScroll = Obj.bind(this.popupScroll, this);
    this.popupClick = Obj.bind(this.popupClick, this);

    /**
     * A destructor function, to be called when the auto-completer is destroyed.
     */
    this.shutdown = function()
    {
        this.completionBox.value = "";

        if (this.completionPopup)
        {
            Events.removeEventListener(this.completionPopup, "mousedown", this.popupMousedown, true);
            Events.removeEventListener(this.completionPopup, "DOMMouseScroll", this.popupScroll, true);
            Events.removeEventListener(this.completionPopup, "click", this.popupClick, true);
        }
    };

    if (this.completionPopup)
    {
        Events.addEventListener(this.completionPopup, "mousedown", this.popupMousedown, true);
        Events.addEventListener(this.completionPopup, "DOMMouseScroll", this.popupScroll, true);
        Events.addEventListener(this.completionPopup, "click", this.popupClick, true);
    }
}