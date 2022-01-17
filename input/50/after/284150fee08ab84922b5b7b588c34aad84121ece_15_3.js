function(scene){
              var item = scene.vars.item;
              if(item.click){
                  return item.click();
              }
          }