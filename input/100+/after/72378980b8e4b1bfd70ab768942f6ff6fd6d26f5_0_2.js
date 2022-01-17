function () {
            var overallSizeCompressed = 0,
                overallSizeUncompressed = 0;

            _.each(uncompressedFileSizes, function (uncompressedSize, file) {
                overallSizeCompressed += compressedFileSizes[file];
                overallSizeUncompressed += uncompressedSize;
            });

            currentFilesInProcess = {};
            grunt.log.ok('Compressed ' + files.length + ' files');
            grunt.log.ok('Uncompressed size: ' + (Math.round((overallSizeUncompressed / 1024) * 100) / 100) + 'kb, Compressed size: ' + (Math.round((overallSizeCompressed / 1024) * 100) / 100) + 'kb, Savings: ' + (Math.round((100 - (overallSizeCompressed / overallSizeUncompressed * 100)) * 100) / 100)  + '%');
            done();
        }