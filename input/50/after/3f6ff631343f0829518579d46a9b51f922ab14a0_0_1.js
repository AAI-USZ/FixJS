function(contents) { 
            $editorInput
              .text(contents)
              .attr('contenteditable', !isResult);
            Editor.highlight($editorInput.get(0));
          }