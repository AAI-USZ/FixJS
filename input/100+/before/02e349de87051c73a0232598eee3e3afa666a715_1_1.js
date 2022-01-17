function( post, idx ){
        if ( ! ( this instanceof PostView ) ){
            return new PostView( post, idx );
        }

        if ( ! tmpl ){
            tmpl = Handlebars.compile( $( '#tmpl-post' ).html() );
        }

        var self = this;
        this.model = post;
        this.$el = $( tmpl( this.model ) ).data( 'postIndex', idx );
        this.innerHtml = this.$el[ 0 ].innerHTML;
        this.isClearedClass = 'is-cleared';

        this.model.on( 'update:isActive', function( isActive ){
            if( isActive ){
                self.render();
            } else {
                self.remove();
            }
        });
        this.model.on( 'update:fbshares', function(){
            self.render();
        });

        this.setup();
    }