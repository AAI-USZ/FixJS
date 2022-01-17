function( $parent, $detail, state ) {
            $detail.add($parent)
                .removeClass( collapsedClass )
                .addClass( expandedClass )
            // Toggle parent row visibility?
            // ( this.options.obscureParent ) && $parent.toggle();
            $detail.find( this.options.detailWrapperClass )
                [ this._getAnimationMethod( state ) ]( this.options.speed, function() {
                    // this._trigger('afterShow');
                });
        }