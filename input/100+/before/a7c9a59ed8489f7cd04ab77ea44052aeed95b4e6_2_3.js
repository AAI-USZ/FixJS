function() {
        var state           = this.state_object();
        var healthy_remotes = [];
        var unhealthy_sets  = 0;
        var healthy_sets    = 0;

        // This is a 2 layer nested array, of remotes to connect to.
        // May look something like this:
        // [ [ "tcp://localhost:10001", "socket:///tmp/echo1.socket" ],
        //   [ "tcp://localhost:10002", "udp://localhost:10005" ] ]

        var i, j;
        for( i = 0; i < this.servers.length; i++ ) {

            var ary                     = this.servers[i];
            var healthy_remote_found    = 0;

            // The 'break' in the else below is making JSLint deem this
            // a 'strange loop'. However, since there's 2 conditionals
            // before this that may make it continue, the lint message
            // is incorrect. Unfortunately, I don't know how to rewrite
            // this so JSlint is less upset :(
            for( j = 0; j < ary.length; j++ ) {

                // Get the object represented by this connection string
                var remote  = state.all_servers[ ary[j] ];
                var name    = remote.name;

                // You're down. The reconnector will try to connect to
                // you on it's own. No action here.
                // You may have either been marked as unavailable at the
                // line below, or when one of the senders encountered an
                // error.
                if( remote.is_available === false ) {
                    continue;

                // potential socket, but check if it's not been destroyed.
                // this happens if the remote end disappears, which means
                // we should mark it for reconnect
                } else if ( remote.connection.destroyed ) {
                    C._debug( U.format(
                        "Server %s unavailable - marking for reconnect", name ) );

                    remote.mark_unavailable();
                    continue;

                // Everything seems fine, you are healthy.
                } else {
                    healthy_remotes.push( remote );

                    // this signals we found a node in the set that works.
                    healthy_remote_found++;

                    // and therefor, we dont need another at the momemt.
                    break;
                }
            }

            // Now, did we find at least one healthy server in this set?
            if( !healthy_remote_found ) {
                C._trace( [ "No available server found in this set", ary ] );
                unhealthy_sets++;
            } else{
                healthy_sets++;
            }
        }

        state.health_check.healthy_chains   = healthy_sets;
        state.health_check.unhealthy_chains = unhealthy_sets;


        // So, we don't have any servers in at least one set? That's not good.
        // XXX implement overflow here
        // XXX this will spam the stderr logs like crazy, find a cleaner way
        if( unhealthy_sets ) {
            C._error(
                "No healthy servers founds in "+ unhealthy_sets +" sets - dropping traffic"
            );
        }

        return healthy_remotes;

    }