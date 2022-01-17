function(popup, url, line)
    {
        var editor = this.getDefaultEditor();
        var doc = popup.ownerDocument;
        var item = doc.getElementById("menu_firebug_firebugOpenWithEditor");

        if (item)
        {
            item = item.cloneNode(true);
            item.hidden = false;
            item.removeAttribute("openFromContext");
        }
        else
        {
            item = this.createContextMenuItem(doc);
        }

        item.setAttribute("image", editor.image);
        item.setAttribute("label", editor.label);
        item.value = editor.id;

        popup.appendChild(item);

        this.lastSource={url: url, line: line};
    }