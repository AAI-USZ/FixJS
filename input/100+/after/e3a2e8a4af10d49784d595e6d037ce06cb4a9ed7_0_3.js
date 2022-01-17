function ($) {
    var _parent = $.Widget;
    var widgetName = 'accordionTable';
    var collapsedClass = 'ui-state-collapsed';
    var expandedClass = 'ui-state-expanded';

    $.widget('ui.' + widgetName, {
        // Default options
        options: {
            // Animation type (slide, toggle, or fade)
            animation: 'slide',
            // Animation speed
            speed: 200,
            // Add a close button?
            addClose: true,
            // Tempalte markup for close button
            closeButton: '<a href="#" class="close trigger">close</a>',
            // Copy TH from trigger row?
            copyHeaders: false,
            // Visible row selector
            parentSelector: 'tr.parent',
            // Detail row selector
            detailSelector: 'tr.detail',
            // Trigger selector
            detailTrigger: '.trigger',
            // Wrapper around the detail contents to facilitate
            //   animation (can't animate table elements).
            detailWrapperClass: '.drawer',
            // Whole row is a trigger for details?
            wholeRowToggles: true,
            // Calcualte columns automatically?
            //   Don't need. Make smarter
            calculateColspan: true,
            // Detail row will obscure/hide parent row?
            obscureParent: false,
            // Callbacks
            afterEachRow: false, // function ( row ) {},
            afterAll: false, // function ( objs ) {},
            afterShow: false, // function( event ) {},
            afterHide: false // function( event ) {}
        },

        // Fired the first time the widget is called on an element. Hook up events,
        _create: function() {
            // this.element = element widget is invoked on
            // this.options = merged options hash
            // var $elem = this.element;
            var _this = this;
            var options = _this.options;
            this.parentRows = $(this.element.find( options.parentSelector ));
            this.detailRows = $(this.element.find( options.detailSelector ));
            var eventElement = ( options.wholeRowToggles ) ? options.parentSelector : options.detailTrigger;

            // Setup each row
            $.each( this.parentRows, function( i, el ) {
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
            });

            // Events
            $(document).on('click', eventElement, function( e ) {
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
        if ( false ) {
            console.log('starting internal events');
            for ( event in _this._events ) {
                if ( _this._events.hasOwnProperty( event ) ) {
                    _this.element.on( event, _this._events[event] );
                }
            }
            console.log('done setting up internal event listeners');
        }

            // Execute callback after the table is processed
            // this._trigger( 'afterAll', this.element );
        },

        // Determine if we're sliding, fading, or toggling,and what direction.
        // TODO: Figure out a way to cache this? Maybe currying?
        _getToggleMethod: function( state ) {
            switch ( this.options.animation ) {
                case 'fade':
                    return ( state === 'show' ) ? 'fadeIn' : 'fadeOut';
                case 'slide':
                    return ( state === 'show' ) ? 'slideDown' : 'slideUp';
                default:
                    return state;
            }
        },
        _showDetail: function( $parent, $detail, state ) {
            var _this;
            $detail.add($parent)
                .removeClass( collapsedClass )
                .addClass( expandedClass );
            _this = this;
            // Toggle parent row visibility?
            ( _this.options.obscureParent ) && $parent.hide();
            $detail.find( _this.options.detailWrapperClass )
                [ _this._getToggleMethod( state ) ]( _this.options.speed, function() {
                    // _this._trigger('afterShow');
                });
        },
        _hideDetail: function( $parent, $detail, state ) {
            var _this;
            // Toggle detail row visibility
            _this = this;
            $detail.find( _this.options.detailWrapperClass )
                [ _this._getToggleMethod( state ) ]( _this.options.speed, function() {
                    $detail.add($parent)
                        .addClass( collapsedClass )
                        .removeClass( expandedClass );
                    // Toggle parent row visibility?
                    ( _this.options.obscureParent ) && $parent.show();
                    // _this._trigger('afterHide');
                });
        },

        // Internal event methods
        _events: {
            // 'afterEachRow': this.options.afterEachRow || false,
            // 'afterAll': this.options.afterAll || false,
            // 'afterShow': this.options.afterShow || false,
            // 'afterHide': this.options.afterHide || false
        },

        // Setup
        // _init: function() {},

        // Override option setting method
        // _setOption: function(option, value) {
        //     _parent.prototype._setOption.apply(this, arguments);
        // },

        // Remove and cleanup after the widget. Unbind events, serialize data, remove HTML components
        destroy: function() {
            // Undo markup changes
            // Unbind general UI events
            // Unbind internal events
            for ( event in this._events ) {
                if ( this._events.hasOwnProperty( event ) ) {
                    this.element.unbind( event, this._events[event] );
                }
            }
            // Call parent method
            _parent.prototype.destroy.call(this);
        }
    });
}