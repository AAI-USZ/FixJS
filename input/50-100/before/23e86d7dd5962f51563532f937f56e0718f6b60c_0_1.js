function uninstallExtensionFromUUID(uuid) {
    let extension = ExtensionUtils.extensions[uuid];
    if (!extension)
        return false;

    // Don't try to uninstall system extensions
    if (extension.type != ExtensionUtils.ExtensionType.PER_USER)
        return false;

    if (!ExtensionSystem.unloadExtension(uuid))
        return false;

    FileUtils.recursivelyDeleteDir(extension.dir);
    return true;
}