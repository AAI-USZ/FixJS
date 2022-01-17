function(event_type, callback, prevent_default, stop_propagation)
  {
    var esde = window.services['ecmascript-debugger'];
    var rt_p = '', i = 0, id = '';
    for( ; rt_p = __activeTab[i]; i++ )
    {
      if (!window.runtimes.runtime_has_dom(rt_p))
      {
        continue;
      }
      if( document_map[rt_p] && !checkTriple(document_map[rt_p], event_type, callback) )
      {
        id = getNewHandlerId();
        node_map[id] = document_map[rt_p];
        type_map[id] = event_type;
        callback_map[id] = callback;
        runtime_id_map[id] = rt_p;
        var msg = [id, document_map[ rt_p ], "", event_type,
                   prevent_default && 1 || 0, stop_propagation && 1 || 0];
        esde.requestAddEventHandler(cls.TagManager.IGNORE_RESPONSE, msg);
      }
      else if(__get_document_id[rt_p])
      {
        __get_document_id[rt_p].push([rt_p, event_type, callback, prevent_default, stop_propagation]);
      }
      else
      {
        __get_document_id[rt_p] = [[rt_p, event_type, callback, prevent_default, stop_propagation]];
        var tag = tagManager.set_callback(null, handleAddEventWithDocument, [rt_p]);
        esde.requestEval(tag, [rt_p, 0, 0, "return window.document"]);
      }
    }
  }