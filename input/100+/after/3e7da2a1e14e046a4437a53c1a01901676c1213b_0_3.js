function handleFileSelect(evt) {
      GraphEditor.progressBar.show();

      var files = evt.target.files; // FileList object
      var reader = new FileReader();

      reader.onload = function(e) {
        var gexfContent = e.target.result;

        // NODES
        $(gexfContent).find('node').each(function(index, item){

          // Node custom attributes
          var attributes = {};
          var attributeName = null;
          $(this).find('attvalue').each(function(index){
              var attributeIndex = $(gexfContent).find('attributes').filter('.node');
              if (attributeIndex.length > 0) {
                attributeName = attributeIndex.find('id=' + $(this).attr('for')).attr('title');
              } else {
                attributeName = $(this).attr('for').toLowerCase();
              }
              attributes[attributeName] = $(this).attr('value');
          });

          // Node position
          attributes["position"] =  {
              "x":$(this).find('viz\\:position').attr('x'),
              "y":$(this).find('viz\\:position').attr('y')
          }

          // type
          attributes["type"] = $(this).attr('type');
          attributes["_label"] = $(this).attr('label');
          GraphEditor.addNode($(this).attr('id'), attributes);
        });

        // EDGES
        $(gexfContent).find('edge').each(function(){

          //  Edge custom attributes
          var attributes = {};
          var attributeName = null;
          $(this).find('attvalue').each(function(index){
              var attributeIndex = $(gexfContent).find('attributes').filter('.edge');
              if (attributeIndex.length > 0) {
                attributeName = attributeIndex.find('id=' + $(this).attr('for')).attr('title');
              } else {
                attributeName = $(this).attr('for').toLowerCase();
              }
              attributes[attributeName] = $(this).attr('value');
          });
          var sourceId = $(this).attr('source');
          var targetId = $(this).attr('target');
          var source = $(gexfContent).find('node#'+sourceId).attr('id');
          var target = $(gexfContent).find('node#'+targetId).attr('id');
          var type = $(this).attr('label');
          GraphEditor.addEdge(source, type, target, attributes);
        });
        GraphEditor.progressBar.hide();
      };

      reader.readAsText(files[0]);
    }