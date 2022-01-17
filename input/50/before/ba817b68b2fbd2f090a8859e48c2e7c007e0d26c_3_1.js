function (context, args) {
          if (Smartgraphs.graphingTool.get("lineCount") == 2)
          {
            this.get('owner').set('requestedCursorStyle', 'default');
            //Smartgraphs.graphingTool.set('showRequestedCursorStyle', false);
          }
          return;
        }