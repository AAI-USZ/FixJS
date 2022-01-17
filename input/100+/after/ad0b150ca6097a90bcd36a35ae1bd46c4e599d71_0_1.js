function findCodeGaps () {
        var codeGaps = [],
            files = getFileNodes();

        for (var i=0; i<files.length; ++i) {
            var fileLine = 0,
                lines = getLineNodes(files[i]),
                fileUrl = getFileUrl(files[i]),
                lastLineNode = createLastLineNode(files[i]);

            for (var j=0; j<lines.length; ++j) {
                var lineNumber = getLineNumber(lines[j]);
                if ('...' === lineNumber) {
                    var nextLineNumber = getLineNumber(lines[j+1]);

                    codeGaps.push({
                        lineNode: lines[j],
                        startLine: fileLine + 1,
                        endLine: parseInt(nextLineNumber, 10) - 1,
                        fileUrl: fileUrl
                    });
                } else {
                    fileLine = parseInt(lineNumber, 10);
                }
            }
            var tbodies = files[i].getElementsByTagName('tbody');
            if (tbodies && tbodies.length) {
                tbodies[0].appendChild(lastLineNode);
                codeGaps.push({
                    lineNode: lastLineNode,
                    startLine: fileLine + 1,
                    fileUrl: fileUrl
                });
            }
        }
        return codeGaps;
    }