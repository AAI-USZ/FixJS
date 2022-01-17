function() {
    if (this.selectionContainsTagName("pre")) {
        return;
    }

    var focus = this.getFocusNode();
    var anchor = TracWysiwyg.getSelfOrAncestor(focus, "a");
    var expand = anchor || TracWysiwyg.getSelfOrAncestor(focus, "tt");
    var currLink;
    if (anchor) {
        var autolink = anchor.getAttribute("data-wysiwyg-autolink");

        if (autolink == "true") {
            var pattern = this.wikiDetectTracLinkPattern;
            pattern.lastIndex = 0;
            var label = TracWysiwyg.getTextContent(anchor);
            var match = pattern.exec(label);
            if (match && match.index == 0 && match[0].length == label.length) {
                currLink = this.normalizeTracLink(label);
            }
        }
        if (!currLink) {
            currLink = anchor.getAttribute("data-wysiwyg-link") || anchor.href;
        }
    }
    else {
        currLink = "";
    }
    if (expand) {
        this.selectNodeContents(expand);
    }
    var text = this.getSelectionText() || "";
    var newLink = (prompt(text ? "Enter link:" : "Insert link:", currLink) || "").replace(/^\s+|\s+$/g, "");
    if (newLink && newLink != currLink) {
        text = text || newLink;
        newLink = this.normalizeTracLink(newLink);
        var id = this.generateDomId();
        var d = this.contentDocument;
        var anonymous = d.createElement("div");
        anchor = this.createAnchor(newLink, text, { id: id });
        anonymous.appendChild(anchor);
        this.insertHTML(anonymous.innerHTML);
        anchor = d.getElementById(id);
        if (anchor) {
            this.selectNodeContents(anchor);
        }
    }
    this.selectionChanged();
}