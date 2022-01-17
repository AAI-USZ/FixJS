function(file, text) {

        

        var chunks = Math.ceil(text.length / chunkSize);
        
        console.log(text, text.length, chunks);
                
        for (var c=0; c<chunks; c++) {
                        
            var start = c*chunkSize;
            var end = (c+1)*chunkSize;
                        
            var chunk = utf8_to_b64(text.substring(start,end));
            // TODO: check if we can send binary data directly

            Command.chunk(file.id, c, chunkSize, chunk);

        }

    }