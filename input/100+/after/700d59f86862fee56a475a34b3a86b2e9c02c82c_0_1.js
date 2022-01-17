function( item ){
        var Container,
          $item,
          $items = this.$items,
          controls = 'lu-controls',
          index;

        if( item === undefined || item === null ){
          return List;
        }

        if( typeof item === 'number' ){
          $item = $items.eq( item );
        } else if ( typeof item === STRING ){
          $item = $items.filter( item );
        } else if( item instanceof $ ){
          $item = item;
        } else {
          return List;
        }

        if( $item.is( this.$items ) ){
          Container = $item.data( controls );

          if( !Container ){
            contain( $item );
          }

          Container = $item.data( controls ).Deferred;

          if( Container.state() === 'pending' ){
            Container.done( function(){
              List.select( $item );
            } );
            return List;
          }

          Container = lu.getControl( $item, CONTAINER );

          if( Container.hasState( SELECTED_STATE ) ){
            Selected = Container;
            List.trigger( SELECTED_EVENT, [ List, Container ] );
            return List;
          }

          if( Selected ){
            if( Container.$element.is( Selected.$element ) ){
              return List;
            }
            Previous = Selected;
            Previous.removeState( SELECTED_STATE );
          }

          Container.addState( SELECTED_STATE );
          Selected = Container;

          index = $items.index( $item );

          if( index > List.index ){
            List.addState( FORWARD_STATE ).removeState( REVERSE_STATE );
          } else {
            List.addState( REVERSE_STATE ).removeState( FORWARD_STATE );
          }

          List.index = index;
          List.trigger( SELECTED_EVENT, [ List, Container ] );

        } else {
          List.trigger( OUT_OF_BOUNDS_EVENT, List );
        }
        return List;
      }