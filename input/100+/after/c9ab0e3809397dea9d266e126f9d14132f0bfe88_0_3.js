function (err) {
    patio.logError(err);
    return dropTableAndDisconnect();
}