function()
{
    WebInspector.View.call(this);
    this.markAsRoot();
    this.element.id = "main-panels";
    this.element.setAttribute("spellcheck", false);
    this._history = [];
    this._historyIterator = -1;
    document.addEventListener("keydown", this._keyDown.bind(this), false);
    document.addEventListener("keypress", this._keyPress.bind(this), false);
    this._panelOrder = [];

    // Windows and Mac have two different definitions of '[', so accept both.
    this._openBracketIdentifiers = ["U+005B", "U+00DB"].keySet();
    this._openBracketCharCode = "[".charCodeAt(0);

    // Windows and Mac have two different definitions of ']', so accept both.
    this._closeBracketIdentifiers = ["U+005D", "U+00DD"].keySet();
    this._closeBracketCharCode = "]".charCodeAt(0);
    this._footerElementContainer = this.element.createChild("div", "inspector-footer status-bar hidden");
    this._panelsElement = this.element.createChild("div", "fill");
}