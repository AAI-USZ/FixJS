function() {
    
      var i, j, offset, offsetX, offsetY, lakeSmallImage, lakeBigImage, treeElement, hillElement;

      // load images
      
      lakeSmallImage = new Image();
      
      lakeSmallImage.src = 'img/gamepad/lake-small.png';

      lakeBigImage = new Image();
      
      lakeBigImage.src = 'img/gamepad/lake-big.png';
      
      // small and big lakes
    
      for (i = 0; i < surface.length; i += 1) {
    
        for (j = 0; j < surface[i].length; j += 1) {
    
          if (!(surface[i][j] === 1 && surface[i][j - 1] === 1 && surface[i + 1][j] === 1) && !(surface[i][j] === 1 && surface[i - 1][j - 1] === 1 && surface[i - 1][j] === 1)) {
   
            if (surface[i][j] === 1 && surface[i][j + 1] === 1 && surface[i + 1][j + 1] === 1 && !(surface[i][j] === 1 && surface[i][j - 1] === 1 && surface[i + 1][j] === 1) && !(surface[i][j] === 1 && surface[i - 1][j - 1] === 1 && surface[i - 1][j] === 1)) {
    
              // draw big lake
              
              offset = j % 2 === 1 ? 36 : 0;
        
              canvasContext.drawImage(lakeBigImage, j * 54 + 4, i * 72 + 8 + offset, 122, 134);
            
            } else {
          
              if (surface[i][j] === 1) {
              
                // draw small lake
                
                offset = j % 2 === 0 ? 36 : 0;
          
                canvasContext.drawImage(lakeSmallImage, j * 54 + 15, i * 72 + 14 + offset, 45, 44);
              
              }
                  
            }
          
          }
          
        }
        
      }
      
      // small and big trees
      
      for (i = 0; i < surface.length; i += 1) {
    
        for (j = 0; j < surface[i].length; j += 1) {
    
          if (surface[i][j] === 2) {

            treeElement = $('.trees').first().clone().appendTo('#gamepad');
            
            if (props[i][j] === 1) {
            
              treeElement.addClass('one');
              
              offsetX = 10;
              offsetY = j % 2 === 0 ? 36 : 0;
          
            }
            
            if (props[i][j] === 2) {
            
              treeElement.addClass('many');
              
              offsetX = 0;
              offsetY = j % 2 === 0 ? 20 : -16;
          
            }
            
            // prevent trees from beeing draged while moving the gamepad
            
            treeElement.mousedown(ONLINGA.Gamepad.preventEventDefault);

            treeElement.attr('id', 'tree-tile-' + i + '-' + j).css({
            
              left: j * 54 + offsetX,
              
              top: i * 72 + 10 + offsetY,
              
              display: 'block'
              
            });
            
            if (ONLINGA.Gamepad.getMilitaryAtPosition(j, i)) {
            
              treeElement.addClass('transparent');
            
            }
          
          }

        }
        
      }
      
      // hills
    
      for (i = 0; i < surface.length; i += 1) {
    
        for (j = 0; j < surface[i].length; j += 1) {
    
          if (surface[i][j] === 3) {

            hillElement = $('.hills').first().clone().appendTo('#gamepad');
            
            hillElement.addClass('version-' + props[i][j]);
              
            offsetY = j % 2 === 0 ? 36 : 0;

            // prevent hills from beeing draged while moving the gamepad
            
            hillElement.mousedown(ONLINGA.Gamepad.preventEventDefault);

            hillElement.attr('id', 'hill-tile-' + i + '-' + j).css({
            
              left: j * 54,
              
              top: i * 72 + offsetY,
              
              display: 'block'
              
            });
          
          }

        }
        
      }
      
    }