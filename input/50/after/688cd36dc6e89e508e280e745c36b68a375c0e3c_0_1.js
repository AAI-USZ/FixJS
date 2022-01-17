function( data ) {
            if ( data && data.meta ) {
                this.meta = data.meta;
            }

            return data && data.objects;
        }