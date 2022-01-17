function () {
                  if (x.readyState == 4 && x.status == 200) {
                    try {
                        var cmds = JSON.parse(x.responseText);
                        for (var i = 0; i < cmds.length; i++) {
                            // forward command to extension
                            __p.postMessage(cmds[i]);
                        }
                    } catch(e) {}
                  }
                }