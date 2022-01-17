function(cssCompletions, sidebarPane, isEditingName, acceptCallback)
{
    // Use the same callback both for applyItemCallback and acceptItemCallback.
    WebInspector.TextPrompt.call(this, this._buildPropertyCompletions.bind(this), WebInspector.StylesSidebarPane.StyleValueDelimiters);
    this.setSuggestBoxEnabled("generic-suggest");
    this._cssCompletions = cssCompletions;
    this._sidebarPane = sidebarPane;
    this._isEditingName = isEditingName;
}