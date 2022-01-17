function ( event )//:void
    {
        var _list1 = _listCol.getListenerList(event.getType(), event.constructor);
        var _list2 = _listCol.getListenerList(event.getType());
        if ( _list1 != null )
        {
            var _listeners1 = _list1.getListeners();
            for ( var i = 0; i < _listeners1.length; i++ )
            {
                if ( event.getIsPropagationStopped() ) return;
                _listeners1[i].func.call(_listeners1[i].scope, event);
            }
        }
        if ( _list2 != null )
        {
            var _listeners2 = _list2.getListeners();
            for ( var j = 0; j < _listeners2.length; j++ )
            {
                if ( event.getIsPropagationStopped() ) return;
                _listeners2[j].func.call(_listeners2[j].scope, event);
            }
        }
    }