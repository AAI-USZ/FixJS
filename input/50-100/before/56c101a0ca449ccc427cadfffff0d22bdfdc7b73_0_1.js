function(file, callback1) {
            var format, fullpath, pipe, source;
            fullpath = path.join(dirPath, file);
            format = getFileFormat(fullpath);
            source = createReadStream(fullpath, format);
            pipe = pipeFactory.build(['READ_' + format, 'CHECK', 'SUBMIT'], options);
            pipe.on('end', callback1);
            return pipe.pump(source);
          }