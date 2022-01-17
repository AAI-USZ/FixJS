function unloadClient() {

    // explicitly unload client for it to be loaded again

    delete require.cache[require.resolve(_apiDir + "/client")];

    client = null;

}