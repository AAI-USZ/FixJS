function(process, type, stat) {
    var idx = process + '_' + type + '_' + stat; // small risk of collision
    if(!my.graph[idx]) {
      if(type === 'c') {
        my.graph[idx] = c_graph_c({ path: my.path + '/' + idx,
                                    container: my.container,
                                    process: process,
                                    type: type,
                                    stat: stat });
      }
      if(type === 'g') {
        my.graph[idx] = g_graph_c({ path: my.path + '/' + idx,
                                    container: my.container,
                                    process: process,
                                    type: type,
                                    stat: stat });
      }
      if(type === 'ms') {
        my.graph[idx] = ms_graph_c({ path: my.path + '/' + idx,
                                     container: my.container,
                                     process: process,
                                     type: type,
                                     name: stat });
      }
      my.children[idx] = my.graph[idx];
      my.graph[idx].on('destroy', function() {
        delete my.graph[idx];
        delete my.children[idx];
      });
      my.graph[idx].build();
    }
    return my.graph[idx];
  }