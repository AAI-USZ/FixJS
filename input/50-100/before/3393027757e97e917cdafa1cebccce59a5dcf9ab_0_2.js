function(index){
              var attributeIndex = $(gexfContent).find('attributes').filter('.edge');
              if (attributeIndex.length > 0) {
                attributeName = attributeIndex.find('id=' + $(this).attr('for')).attr('title');
              } else {
                attributeName = $(this).attr('for').toLowerCase();
              }
              attributes[attributeName] = $(this).attr('value');
          }