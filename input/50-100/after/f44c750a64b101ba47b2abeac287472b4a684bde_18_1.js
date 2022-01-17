function(rt_id)
  {
    var rt = window.runtimes.getRuntime(rt_id);
    return (
    ['li',
      rt ?
      ['pre',
        'runtimeID: ' + rt.runtime_id + '\n' +
        'htmlFramePath: ' + rt.html_frame_path + '\n' +
        'windowID: ' + rt.window_id + '\n' +
        'objectID: ' + rt.object_id + '\n' +
        'uri: ' + rt.uri
      ] :
      []
    ]);
  }