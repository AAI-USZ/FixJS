function(index){
              var attributeIndex = $(gexfContent).find('attributes').filter('.node');
              if (attributeIndex.length > 0) {
                attributeName = attributeIndex.find('#' + $(this).attr('for')).attr('title');
              } else {
                attributeName = $(this).attr('for').toLowerCase();
              }
              attributes[attributeName] = $(this).attr('value');
          }