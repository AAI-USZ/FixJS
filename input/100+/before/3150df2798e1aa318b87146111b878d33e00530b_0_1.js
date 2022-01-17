function (ev) {
            log(ev);
            var scriptId = ev.scriptId;
            Inspector.Debugger.getScriptSource(ev.scriptId, function (ev) {
                var src = ev.scriptSource;
                var lines = src.split('\n');

                log({ scriptId: scriptId, source: $.map(lines, function (line, i) { return ('' + i).lpad(' ', 3) + ': ' + line }).join("\n") });

                if (/^\n\/\/internal/.test(src)) {
                    return;
                }

                // var loc = { scriptId: scriptId, lineNumber: 11, columnNumber: 0 };
                // log('setting breakpoint at', loc, lines[loc.lineNumber].slice(loc.columnNumber));
                // Inspector.Debugger.setBreakpoint(loc);
                // // JSLINT(src);
                // // console.log(JSLINT.tree)
            });
        }