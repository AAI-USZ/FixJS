function( $element, settings ){
      var List = this,
        Selected,
        Previous,
        $items;

      if( settings.items ){
        if( typeof settings.items === 'string' ){
          $items = $element.children( settings.items );
        } else {
          $items = settings.items;
        }
      } else {
        if( $element.is( 'ul, ol' ) ){
          $items = $element.children();
        } else {
          $items = $element.children( 'ul, ol' ).first().children();
        }
      }

      if( !$items ){
        $items = $element.children();
      }

      _.defaults( settings, defaults );

      Abstract.init.call( this, $element, settings );

      /**
       * Select an item in the list
       * @method select
       * @public
       * @param {Integer|String|Object} item The index of the item to select, a css selector, or a JQuery collection containting the item.
       * @return {Object} List
       */
      List.select = function( item ){
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
        } else if ( typeof item === 'string' ){
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

          Container = lu.getControl( $item, 'Container' );

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
      };

      List.index = 0;
      List.$items = $items;
      List.orientation = settings.orientation;

      List.on( SELECT_EVENT, function( event, item ){
        event.stopPropagation();
        List.select( item );
      } );

      List.on( NEXT_EVENT, function( event ){
        event.stopPropagation();
        List.next();
      } );

      List.on( PREVIOUS_EVENT, function( event ){
        event.stopPropagation();
        List.previous();
      } );

      List.on( FIRST_EVENT, function( event ){
        event.stopPropagation();
        List.first();
      } );

      List.on( LAST_EVENT, function( event ){
        event.stopPropagation();
        List.last();
      } );

      List.on( STATED_EVENT, function( event, Control ){
        var $stated = Control.$element;

        if( $stated.is( $element ) ){
          return;
        }

        event.stopPropagation();

        if( !Selected ){
          Selected = Control;
          List.select( $stated );
          return;
        }

        if( Control.hasState( SELECTED_STATE ) && !$stated.is( Selected.$element ) ){
          List.select( $stated );
        }
      } );

      $( 'body' ).keyup( function( event ){
        keyup( event, List );
      } );
    }