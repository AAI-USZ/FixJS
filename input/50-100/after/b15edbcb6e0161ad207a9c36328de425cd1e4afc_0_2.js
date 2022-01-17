function(name) {
               var url = toolboxState == undefined ?
                   'site/{0}.html'.format(name) :
                   toolboxState.pmt.path + '/' + 'site/{0}.html'.format(name);
               PM.syncget(url,
                          function(content) {
                              console.log('Loading template ' + name);
                              ich.addTemplate(name, content);
                          });
          }