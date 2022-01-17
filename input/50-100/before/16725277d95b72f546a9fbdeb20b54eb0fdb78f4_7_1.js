function() {
            var now = new Date();
            var diff = (now - start) / 1000 / 60;
            var s = 'redirects: ' + ( options.stats.redirects || 0 ) + '\n';
            var reqs = ( options.stats.requests || 0 );
            var rpm = Math.floor(( reqs / diff ) * 10) / 10;
            s += 'requests: ' + reqs + ' ' + rpm + '/min';
            return s;
        }