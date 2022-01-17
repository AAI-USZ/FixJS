function(content) {
                  var html = $(content), scripts = html.find("script"), view, exeScripts = [], code = [], finalScript;
                  scripts.forEach(function(script) {
                     var scr = $(script), type = scr.attr("type");
                     if(!scr.attr("src") && (!type || type.indexOf("/javascript") !== -1)) {
                        html.remove(script);
                        exeScripts[exeScripts.length] = script;
                     }
                  });
                  
                  viewPort.append(html);
                  view = $("#" + id);
                  
                  forEach(exeScripts, function(script) {
                     code[code.length] = script.textContent;
                  });
                  
                  finalScript = document.createElement("script");
                  finalScript.textContent = code.join('\n');
                  view.append(finalScript);
                  
                  if(callback) {
                     callback(id);
                  }
               }