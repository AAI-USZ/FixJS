function (func) {
        var state = this.state_object();

        // This is a 2 layer nested array, of remotes to connect to.
        // May look something like this:
        // [ [ "tcp://localhost:10001", "socket:///tmp/echo1.socket" ],
        //   [ "tcp://localhost:10002", "udp://localhost:10005" ] ]

        var i, j;
        for( i = 0; i < this.servers.length; i++ ) {

            var ary = this.servers[i];

            for( j = 0; j < ary.length; j++ ) {
                var remote = _connect_to_server.bind(this)(
                    ary[j], false, this.on_connect_func
                );

                // Store the mapping between the two.
                state.all_servers[ remote.name ] = remote;
            }
        }

        // call the callback if one was provided
        if( func ) { func( this ); }

    }