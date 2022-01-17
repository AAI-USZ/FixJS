function mu_getFolderStorageForFolderId(
                                    messageSuid) {
    var folderId = messageSuid.substring(0, messageSuid.lastIndexOf('/')),
        account = this.getAccountForFolderId(folderId);
    return account.getFolderStorageForFolderId(folderId);
  }