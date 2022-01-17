function ( name ) {
            var value = this.context[ name ];
            if ( !er._util.hasValue( value ) && this.parent ) {
                return this.parent.get( name );
            }

            return value || null;
        }