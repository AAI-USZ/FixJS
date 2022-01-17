function( data ) {
        $.jStorage.set( cacheKey, data );

        if ( $.jStorage.setTTL ) {
          if ( cacheTTL )
            $.jStorage.setTTL( cacheKey, cacheTTL * 60 * 1000 );
        } 
        else
          log('Your jStorage version doesn\'t support TTL on key, please update jStorage ( http://www.jstorage.info/ )');

        // Send a deep clone of data
        var dataCached = $.extend(true, {}, data );
        
        if ( successhandler )
          successhandler( dataCached );

        // Don't execute this success callback again
        options.success = successhandler;
      }