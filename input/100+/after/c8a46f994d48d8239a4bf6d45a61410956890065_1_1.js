function(folder, firstTime) {
    var folderNode = folder.element;

    if (firstTime) {
      if (!folder.selectable)
        folderNode.classList.add('fld-folder-unselectable');

      var depthIdx = Math.min(FOLDER_DEPTH_CLASSES.length - 1, folder.depth);
      folderNode.classList.add(FOLDER_DEPTH_CLASSES[depthIdx]);

      folderNode.getElementsByClassName('fld-folder-name')[0]
        .textContent = folder.name;
    }

    if (folder === this.curFolder)
      folderNode.classList.add('fld-folder-selected');
    else
      folderNode.classList.remove('fld-folder-selected');

    // XXX do the unread count stuff once we have that info
  }