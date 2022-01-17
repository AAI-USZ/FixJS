function(aURI, aContentType, aData) {
    /*
    I know what you think: "Why all this mess? Couldn't Image() do the same job?"
    Image(), even with a data uri, is async and we need to return a response
    not to fire a callback.
    Then, the only way is to decode image from its content.
    */
    let imgTools = Cc["@mozilla.org/image/tools;1"].getService(Ci.imgITools);

    let imgData = aData.join('');

    let binaryOutputStream = Cc["@mozilla.org/binaryoutputstream;1"].createInstance(Ci.nsIBinaryOutputStream);
    let storageStream = Cc["@mozilla.org/storagestream;1"].createInstance(Ci.nsIStorageStream);
    storageStream.init(4096, imgData.length, null);
    binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
    binaryOutputStream.writeBytes(imgData, imgData.length);
    binaryOutputStream.close();

    let inputStream = storageStream.newInputStream(0);

    let bInputStream = Cc["@mozilla.org/network/buffered-input-stream;1"].createInstance(Ci.nsIBufferedInputStream);
    bInputStream.init(inputStream, 1024);

    try {
        let outParam = {value: null};
        imgTools.decodeImageData(bInputStream, aContentType, outParam);
        return [outParam.value.width, outParam.value.height, outParam.value.animated];
    } catch(e) {
        require("tools/debug").debug("Failed to load image information - " + aURI);
        return [0,0, false];
    }
}