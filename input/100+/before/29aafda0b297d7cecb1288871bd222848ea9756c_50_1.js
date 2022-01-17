function(element, index, array)
    {
        var branch = Services.prefs.getBranch("extensions.firebug.key.");
        var shortcut = branch.getCharPref("shortcut." + element);
        var tokens = shortcut.split(" ");
        var key = tokens.pop();
        var modifiers = tokens.join(",")

        var keyElem = document.getElementById("key_" + element);
        if (!keyElem)
        {
            // If key is not defined in xul, add it
            keyElem = document.createElement("key");
            keyElem.className = "fbOnlyKey";
            keyElem.id = "key_"+element;
            keyElem.command = "cmd_"+element;
            document.getElementById("mainKeyset").appendChild(keyElem);
        }

        // invalidAttr needed in case default shortcut uses key rather than keycode
        var attr = "key";
        var invalidAttr = "key";

        // Choose between key or keycode attribute
        if (key.length <= 1)
        {
            invalidAttr = "keycode";
        }
        else if (KeyEvent["DOM_"+key])
        {
            attr = "keycode";
        }
        else
        {
            // Only set valid keycodes
            return;
        }

        keyElem.setAttribute("modifiers", modifiers);
        keyElem.setAttribute(attr, key);
        keyElem.removeAttribute(invalidAttr);

        if (this.keysets.indexOf(keyElem.parentNode) == -1)
            this.keysets.push(keyElem.parentNode);

        // Modify shortcut for global key, if it exists
        var keyElem = Firefox.getElementById("key_" + element);

        if (!keyElem)
            return;

        if (FBTrace.DBG_SHORTCUTS)
        {
            FBTrace.sysout("Firebug.ShortcutsModel.initShortcut; global shortcut",
                {key: key, modifiers: modifiers});
        }

        // Disable existing global shortcuts
        var selector = "key["+attr+"='"+key+"'][modifiers='"+modifiers+"']"
            + ":not([id='key_"+element+"']):not([disabled='true'])";
        var existingKeyElements = keyElem.ownerDocument.querySelectorAll(selector);
        for (var i = existingKeyElements.length - 1; i >= 0; i--)
        {
            var existingKeyElement = existingKeyElements[i];
            existingKeyElement.setAttribute("disabled", "true");
            this.disabledKeyElements.push(existingKeyElement);
        }

        keyElem.setAttribute("modifiers", modifiers);
        keyElem.setAttribute(attr, key);
        keyElem.removeAttribute(invalidAttr);

        if (this.keysets.indexOf(keyElem.parentNode) == -1)
            this.keysets.push(keyElem.parentNode);
    }