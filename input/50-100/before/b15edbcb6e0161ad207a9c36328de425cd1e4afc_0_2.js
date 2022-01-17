function(name) {
               PM.syncget('site/{0}.html'.format(name),
                             function(content) {
                                 console.log('Loading template ' + name);
                                 ich.addTemplate(name, content);
                             });
          }