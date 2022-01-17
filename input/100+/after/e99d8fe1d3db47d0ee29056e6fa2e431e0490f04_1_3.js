function(content) {
                  var html = $(content), scripts = html.find("script"), viewUi, exeScripts = [], code = [], finalScript;
                  scripts.forEach(function(script) {
                     var scr = $(script), type = scr.attr("type");
                     if(!scr.attr("src") && (!type || type.indexOf("/javascript") !== -1)) {
                        html.remove(script);
                        exeScripts[exeScripts.length] = script;
                     }
                  });
                  
                  viewPort.append(html);
                  viewUi = $("#" + id);
                  
                  if(!viewUi.count()) {
                     throw new Error("View UI element not found")
                  }
                  
                  forEach(exeScripts, function(script) {
                     code[code.length] = script.textContent;
                  });
                  
                  finalScript = document.createElement("script");
                  finalScript.textContent = code.join('\n');
                  viewUi.append(finalScript);
                  
                  if(views[id] && callback) {
                     callback(id);
                  }
               }