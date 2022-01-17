function (anode) {
      node = anode;
      dialog = newNode('div', {class: 'dialog'});
      jQuery(dialog).append(newNode('form', {method:'get', action:'#record'},
          newNode('p',
              newNode('h3', 'Start recording a new script at'),
              newNode('input', {id:'startup-url-2', type:'text', class:'texta', size:'24'}),
              newNode('p', {},
                newNode('input', {type:'submit', value:'Selenium 1', class:'button',
                  click:function(e) {
                    builder.record.startRecording(jQuery("#startup-url-2").val(), builder.selenium1);
                    node.html('');
                    builder.gui.menu.updateRunSuiteOnRC();
                  }}),
                newNode('input', {type:'submit', value:'Selenium 2', class:'button',
                  click:function(e) {
                    builder.record.startRecording(jQuery("#startup-url-2").val(), builder.selenium2);
                    node.html('');
                    builder.gui.menu.updateRunSuiteOnRC();
                  }}),
                newNode('a', 'Cancel', {
                    class: 'button',
                    click: function () {
                      node.html('');
                    },
                    href: '#cancel'
                })
              ),
              newNode('p', {class:'cookie-warning'},
                "This will delete all cookies for the domain you're recording for."
              )
          )
      ));
      node.append(dialog);
      jQuery('#startup-url-2').val(builder.pageState.currentUrl);
    }