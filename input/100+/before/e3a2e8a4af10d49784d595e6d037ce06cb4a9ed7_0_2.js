function() {
            // this.element = element widget is invoked on
            // this.options = merged options hash
            // var $elem = this.element;
            var _this = this;
            var options = _this.options;
            this.parentRows = $(this.element.find( options.parentSelector ));
            this.detailRows = $(this.element.find( options.detailSelector ));
            console.log( this.parentRows );

            // Setup each row
            $.each( this.parentRows, function( i, el ) {
                var $pRow = $(el);
                console.log( $pRow );
                var $dRow = $pRow.next( options.detailSelector );
                var $rowPair = $pRow.add($dRow);
                var $dTd = $dRow.find('td');
                var $trigger = $pRow.find( options.detailTrigger );
                var drawerClass = options.detailWrapperClass.replace(/^\./, "");

                // Attach the detail row jQ ref to the elements
                $pRow.data( 'detailRow', $dRow );
                $trigger.data( 'detailRow', $dRow );
                $dRow.data( 'parentRow', $pRow )

                // Add UI classes to rows
                $rowPair.addClass( collapsedClass );

                // Copy TH contents from parent to detail?
                if ( options.copyHeaders ) {
                    $dRow.find('th,td').eq(0).html( $pRow.find('th,td').eq(0).html() );
                }
                // wrap the contents with a hidden div for animation
                if ( !$dTd.find( options.detailWrapperClass ).length ) {
                    $dTd.wrapInner('<div class="' + drawerClass + '" style="display:none;"/>');
                }
                // Add the close button to the detail view?
                if ( options.addClose ) {
                    $dTd.find( options.detailWrapperClass ).append( options.closeButton );
                }
                // Set colspan if one isn't provided?
                if ( options.calculateColspan
                    && $dTd.length === 1
                    && ( !$dTd.attr('colspan')
                        // This fall through (OR) check is because IE8 assumes all
                        // TDs have a colspan, specified or not
                        || $dTd.attr('colspan') <= 1 )
                    ) {
                    $dTd.attr('colspan', $pRow.find('td').length);
                }
                // Add close button?
                if ( options.addClose ) {
                    $(document).on( 'click', '.detail .trigger', function( e ) {
                        e.stopPropagation();
                        e.preventDefault();
                        var $this = $(this);
                        $this.parents('tr').data( 'parentRow' ).find('.trigger').click();
                    });
                }
                // Execute callback after each row is processed
                // this._trigger( 'afterEachRow', $rowPair );
            });

            // Events
            this.element.find( options.parentSelector ).on('click', function( e ) {
                e.preventDefault();
                var $this = $(this);
                var $detail = $this.data( 'detailRow' );
                var $parent = $detail.data( 'parentRow' );
                var state = ( $detail.find( options.detailWrapperClass ).is(':hidden') ) ? 'show' : 'hide';
                // Fire one of the methods
                if ( state === 'show' ) {
                    _this._showDetail.apply(_this, [ $parent, $detail, state ]);
                } else {
                    _this._hideDetail.apply(_this, [ $parent, $detail, state ]);
                }
                return e;
            });

            // Internal events
            console.log('starting internal events');
            // for ( event in this._events ) {
            //     if ( this._events.hasOwnProperty( event ) ) {
            //         this.element.on( event, this._events[event] );
            //     }
            // }
            console.log('done setting up internal event listeners');

            // Execute callback after the table is processed
            // this._trigger( 'afterAll', this.element );
        }