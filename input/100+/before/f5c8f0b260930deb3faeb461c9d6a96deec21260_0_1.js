function(fileSystem)
{
    WebInspector.SplitView.call(this, WebInspector.SplitView.SidebarPosition.Left, "FileSystemViewSidebarWidth");
    this.element.addStyleClass("file-system-view");

    var directoryTreeElement = this.element.createChild("ol", "filesystem-directory-tree");
    this.directoryTree = new TreeOutline(directoryTreeElement);
    this.sidebarElement.appendChild(directoryTreeElement);
    this.sidebarElement.addStyleClass("outline-disclosure");
    this.sidebarElement.addStyleClass("sidebar");

    var rootItem = new WebInspector.FileSystemView.EntryTreeElement(this, fileSystem.root);
    rootItem.expanded = true;
    this.directoryTree.appendChild(rootItem);
    this._visibleView = null;
}