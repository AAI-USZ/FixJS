function() {
            // Use the id if possible
            var url = this.id;

            // If there's no idAttribute, use the 'urlRoot'. Fallback to try to have the collection construct a url.
            // Explicitly add the 'id' attribute if the model has one.
            if ( !url ) {
                url = this.urlRoot;
                url = _.isFunction( this.urlRoot ) ? this.urlRoot() : this.urlRoot;
                url = url || (this.collection && ( _.isFunction( this.collection.url ) ? this.collection.url() : this.collection.url ));

                if ( url && this.has( 'id' ) ) {
                    url = TastyPie.addSlash( url ) + this.get( 'id' );
                }
            }

            url = url && TastyPie.addSlash( url );

            return url || null;
        }