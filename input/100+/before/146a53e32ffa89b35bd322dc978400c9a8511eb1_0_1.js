function pull(opts, state) {
    // Update the local file repository with newer data from the server.

    updateFromServer(opts, state);

    // The user presumably want's to be up to date so check that we're running
    // the latest version.

    checkVersion(opts, state);
}