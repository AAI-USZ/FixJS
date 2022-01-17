function(session) {
        this.$deltas = [];
        var worker = new WorkerClient(["ace"], "ace/mode/xquery_worker", "XQueryWorker");
        var that = this;

        session.getDocument().on('change', function(evt){
          that.$deltas.push(evt.data);
        });

        worker.attachToDocument(session.getDocument());
        
        worker.on("start", function(e) {
          //console.log("start");
          that.$deltas = [];
        });

        worker.on("error", function(e) {
          session.setAnnotations([e.data]);
        });
        
        worker.on("ok", function(e) {
            session.clearAnnotations();
        });
        
        worker.on("highlight", function(tokens) {
          var firstRow = 0;
          var lastRow = session.getLength() - 1;
          
          var lines = tokens.data.lines;
          var states = tokens.data.states;
          
          for(var i=0; i < that.$deltas.length; i++)
          {
            var delta = that.$deltas[i];
         
            if (delta.action === "insertLines")
            {
              var newLineCount = delta.lines.length;
              for (var i = 0; i < newLineCount; i++) {
                lines.splice(delta.range.start.row + i, 0, undefined);
                states.splice(delta.range.start.row + i, 0, undefined);
              }
            }
            else if (delta.action === "insertText")
            {
              if (session.getDocument().isNewLine(delta.text))
              {
                lines.splice(delta.range.end.row, 0, undefined);
                states.splice(delta.range.end.row, 0, undefined);
              } else {
                lines[delta.range.start.row] = undefined;
                states[delta.range.start.row] = undefined;
              } 
            } else if (delta.action === "removeLines") {
              var oldLineCount = delta.lines.length;
              lines.splice(delta.range.start.row, oldLineCount);
              states.splice(delta.range.start.row, oldLineCount);
            } else if (delta.action === "removeText") {
              if (session.getDocument().isNewLine(delta.text))
              {
                lines[delta.range.start.row] = undefined;
                lines.splice(delta.range.end.row, 1);
                states[delta.range.start.row] = undefined;
                states.splice(delta.range.end.row, 1);
              } else {
                lines[delta.range.start.row] = undefined;
                states[delta.range.start.row] = undefined;
              }
            }           
          }
          session.bgTokenizer.lines = lines;
          session.bgTokenizer.states = states;
          session.bgTokenizer.fireUpdateEvent(firstRow, lastRow);
        });
        
        return worker;
    }