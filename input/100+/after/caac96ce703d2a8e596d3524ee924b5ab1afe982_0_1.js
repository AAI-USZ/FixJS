function( driver, serializers )
    {
        var that = this;

        if( typeof driver == 'string' )
        {
            if( $.store.drivers[ driver ] )
                this.driver = $.store.drivers[ driver ];
            else
                throw new Error( 'Unknown driver '+ driver );
        }
        else if( typeof driver == 'object' )
        {
            var invalidAPI = !$.isFunction( driver.init )
                || !$.isFunction( driver.get )
                || !$.isFunction( driver.set )
                || !$.isFunction( driver.del )
                || !$.isFunction( driver.flush );

            if( invalidAPI )
                throw new Error( 'The specified driver does not fulfill the API requirements' );

            this.driver = driver;
        }
        else
        {
            // detect and initialize storage driver
            $.each( $.store.drivers, function()
            {
                // skip unavailable drivers
                if( !$.isFunction( this.available ) || !this.available() )
                    return true; // continue;

                that.driver = this;
                if( that.driver.init() === false )
                {
                    that.driver = null;
                    return true; // continue;
                }

                return false; // break;
            });
        }

        // use default serializers if not told otherwise
        if( !serializers )
            serializers = $.store.serializers;

        // intialize serializers
        this.serializers = {};
        this.encoders = [];
        this.decoders = [];
        $.each( serializers, function( key, serializer )
        {
            // skip invalid processors
            if( !$.isFunction( this.init ) )
                return true; // continue;

            that.serializers[ key ] = this;
            that.serializers[ key ].init( that.encoders, that.decoders );
        });
    }