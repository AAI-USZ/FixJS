function() {
    _.each([{name: 'menu', url: 'site/menu.html'},
            {name: 'pmmenu', url: 'site/pmmenu.html'},
            {name: 'metadata', url: 'site/metadata.html'},
            {name: 'argumentlink', url: 'site/argumentlink.html'},
            {name: 'statementlink', url: 'site/statementlink.html'},
            {name: 'premise', url: 'site/premise.html'},
            {name: 'premiseeditorpartial', url: 'site/premiseeditorpartial.html'},
            {name: 'ageditormenu', url: 'site/ag-editor-menu.html'}],
           function(template) {
               PM.syncget(template.url,
                           function(content) {
                               ich.addPartial(template.name, content);
                           });
           });
    _.each(['admin',
            'argumentgraph',
            'argument',
            'argumentlink',
            'arguments',
            'facts',
            'introduction',
            'issues',
            'login',
            'menu',
            'metadata',
            'pmmenu',
            'policies',
            'premise',
            'statement',
            'statementlink',
            'ageditormenuon',
            'statementeditor',
            'argumenteditor',
            'metadataeditor',
            'premiseeditor'],
           function(name) {
               PM.syncget('site/{0}.html'.format(name),
                             function(content) {
                                 console.log('Loading template ' + name);
                                 ich.addTemplate(name, content);
                             });
          });
}