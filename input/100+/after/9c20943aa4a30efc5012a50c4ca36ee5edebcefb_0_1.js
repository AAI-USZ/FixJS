function(fileSystem)
{
    WebInspector.SplitView.call(this, WebInspector.SplitView.SidebarPosition.Left, "FileSystemViewSidebarWidth");
    this.element.addStyleClass("file-system-view");
    this.element.addStyleClass("storage-view");

    var directoryTreeElement = this.element.createChild("ol", "filesystem-directory-tree");
    this._directoryTree = new TreeOutline(directoryTreeElement);
    this.sidebarElement.appendChild(directoryTreeElement);
    this.sidebarElement.addStyleClass("outline-disclosure");
    this.sidebarElement.addStyleClass("sidebar");

    var rootItem = new WebInspector.FileSystemView.EntryTreeElement(this, fileSystem.root);
    rootItem.expanded = true;
    this._directoryTree.appendChild(rootItem);
    this._visibleView = null;

    this._refreshButton = new WebInspector.StatusBarButton(WebInspector.UIString("Refresh"), "refresh-storage-status-bar-item");
    this._refreshButton.visible = true;
    this._refreshButton.addEventListener("click", this._refresh, this);
}