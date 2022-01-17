function(data) {
                             var text = data.content.replace(/</g,'&lt;');
                             text=text.replace(/>/g,"&gt;");
                             mainContent.find("#artifact-content-text" ).html(smallSpinnerImg());
                             mainContent.find("#artifact-content-text" ).html(text);
                             prettyPrint();
                             goToAnchor("artifact-content-text-header");
                           }