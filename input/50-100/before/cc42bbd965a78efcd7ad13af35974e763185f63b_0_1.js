function( fn )
  {
    switch( typeof fn )
    {
      case 'number':
        delete _queue[ fn ];
        break;

      case 'function':
        for( var id in _queue )
          if( _queue[ id ] === fn )
            _animator.removeFromQueue( parseInt( id ));
        break;

      default:
        throw 'Invalid type';
    }

    return _animator;
  }