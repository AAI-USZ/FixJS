function (value) {
                var pos = value.indexOf('<body');
                pos = value.indexOf('>', pos);
                var body = value.substring(pos + 2);
                pos = body.indexOf('<script id="cesium_sandcastle_script">');
                var pos2 = body.lastIndexOf('</script>');
                if ((pos <= 0) || (pos2 <= pos)) {
                    var ele = document.createElement('span');
                    ele.className = 'consoleError';
                    ele.textContent = 'Error reading source file: ' + link + '\n';
                    appendConsole(ele);
                } else {
                    var script = body.substring(pos + 38, pos2 - 1);
                    while (script.charAt(0) < 32) {
                        script = script.substring(1);
                    }
                    jsEditor.setValue(script);
                    htmlEditor.setValue(body.substring(0, pos - 1));
                    CodeMirror.commands.runCesium(jsEditor);
                }
            }