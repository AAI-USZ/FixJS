function( $parent, $detail, state ) {
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
        }