function unpackImageDataToString(imageData) {
        /** * *
        * Unpacks a message from an ImageData object.
        * @param imageData
        * @return String 
        * * **/
        var data = [];
        var acc = 0;
        for (var i=0; i < imageData.data.length; i++) {
            if (++acc === 4) {
                acc = 0;
                continue;
            }
            data.push(imageData.data[i]);
        }
            
        function unpackStringFromArray(data) {
            var stream = bitStream(data, 8);
            var string = '';
            var code = 0;
            var acc = 0;
            for (var i=0; i < stream.length; i++) {
                var bit = stream.at(i);
                if (acc === 7) {
                    if (code === 0) {
                        // Null terminating...
                        return string;
                    }
                    string += String.fromCharCode(code);
                    code = 0;
                    acc = 0;
                }
                code = code << 1 | bit;
                acc++;
            }
            return string;
        }
        return unpackStringFromArray(data);
    }