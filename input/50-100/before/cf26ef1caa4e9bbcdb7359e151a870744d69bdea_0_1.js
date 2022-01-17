function(fileSystemModel, fileSystem, backendEntry)
{
    WebInspector.FileSystemModel.Entry.call(this, fileSystemModel, fileSystem, backendEntry);

    this._mimeType = backendEntry.mimeType;
    this._resourceType = WebInspector.resourceTypes[backendEntry.resourceType];
}