function( $parent, $detail, state ) {
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
        }