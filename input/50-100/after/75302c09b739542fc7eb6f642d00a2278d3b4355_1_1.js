function(){
    var nodes = cy.$('node:selected');

    for( var i = 0; i < nodes.length; i++ ){
      var node = nodes[i];
      var id = node.data('id');

      doc.removeEntity( id );
    }
  }