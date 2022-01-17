function(scene){
              var legendItem = scene.acts.legendItem;
              if(legendItem.click){
                  return legendItem.click();
              }
          }