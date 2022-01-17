function()
  {
    for( var key in _animator.getQueue() )
      return false;

    return true;
  }