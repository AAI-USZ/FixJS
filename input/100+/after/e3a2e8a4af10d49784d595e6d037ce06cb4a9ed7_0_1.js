function( i, el ) {
                var $pRow = $(el);
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
                // if whole row is the trigger?
                if ( options.wholeRowToggles ) {
                    _this.parentRows.css('cursor', 'pointer');
                }
                // Execute callback after each row is processed
                // _this._trigger( 'afterEachRow', $rowPair );
            }