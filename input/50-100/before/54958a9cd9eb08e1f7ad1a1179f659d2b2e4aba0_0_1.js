function( id, fn, length )
  {
    if( typeof fn != 'function' )
      throw 'Invalid type';
    
    length = typeof length == 'number' 
      ? length 
      : null;
    
    _queue[ id ] = _queue[ id ]
      ?
      {
        callback:
          fn,
        
        iterations:
          ( length == null
          ? _queue[ id ].iterations
          : length ),
          
        iterated:
          _queue[ id ].iterated || 0
      }
      :
      {
        callback:
          fn,
        
        iterations:
          length,
          
        iterated:
          0
      };
      
    return this;
  }