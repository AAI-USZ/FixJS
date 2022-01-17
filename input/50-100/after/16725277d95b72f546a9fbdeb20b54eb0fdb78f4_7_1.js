function() {
        var start = new Date();
        var requestRing = new AverageDiffRing(120 * options.statsPerSecond);
        return function() {
            var s = 'redirects: ' + ( options.stats.redirects || 0 ) + '\n';
            var reqs = ( options.stats.requests || 0 );
            requestRing.add(reqs);
            var rpm = requestRing.getAveragePerTime(2, 1000);
            s += 'requests: ' + reqs + ' ' + rpm + '/s';
            return s;
        };
    }