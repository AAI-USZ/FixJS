function(template) {
               PM.syncget(template.url,
                           function(content) {
                               ich.addPartial(template.name, content);
                           });
           }