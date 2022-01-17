function createFunctionList() {
        var doc = DocumentManager.getCurrentDocument();
        if (!doc) {
            return;
        }

        if (!functionList) {
            functionList = [];
            var docText = doc.getText();
            
            // TODO: use a shared JS language intelligence module
            // TODO: this doesn't handle functions with params that spread across lines
            //
            // Note, the global switch on the regex expressions below is NOT used because this code assumes
            // one function per line.  exec() is not called repeatedly for each line.
            var regexA = new RegExp(/(function\b)([^)]+)\b\([^)]*\)/i);  // recognizes the form: function functionName()
            var regexB = new RegExp(/(\w+)\s*=\s*function\s*(\([^)]*\))/i); // recognizes the form: functionName = function()
            var regexC = new RegExp(/((\w+)\s*:\s*function\s*\([^)]*\))/i); // recognizes the form: functionName: function()
            var infoA, infoB, infoC, i, line;
            var funcName, chFrom, chTo;

            var lines = docText.split("\n");

            for (i = 0; i < lines.length; i++) {
                line = lines[i];

                infoA = regexA.exec(line);
                if (infoA) {
                    funcName = $.trim(infoA[0]);
                    chFrom = line.indexOf(funcName);
                    chTo = chFrom + funcName.length;
                    functionList.push(new FileLocation(null, i, chFrom, chTo, funcName));
                }

                infoB = regexB.exec(line);
                if (infoB) {
                    var pattern = $.trim(infoB[1]);
                    var params = infoB[2];
                    var dotIndex = pattern.lastIndexOf(".");
                    if (dotIndex !== -1) {
                        funcName = pattern.slice(dotIndex + 1, pattern.length);
                    } else {
                        funcName = pattern;
                    }

                    chFrom = line.indexOf(funcName);
                    chTo = chFrom + funcName.length;
                    functionList.push(new FileLocation(null, i, chFrom, chTo, funcName + params));
                }

                infoC = regexC.exec(line);
                if (infoC) {
                    funcName = $.trim(infoC[1]);
                    chFrom = line.indexOf(funcName);
                    chTo = chFrom + funcName.length;
                    functionList.push(new FileLocation(null, i, chFrom, chTo, funcName));
                }
            }
        }
    }