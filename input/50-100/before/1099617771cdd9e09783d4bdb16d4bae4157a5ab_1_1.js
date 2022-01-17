function(startStopID, goalStopID) {
    var closedset = []; 
    var startNodes = _.map(this.routes, function(r) {
        _(r.stops)
            .filter(function(s) { return s.id === startStopID; })
            .map(function(s) { return { stop: s, route: r }; });
    });
    console.log(startNodes);
    var openset = _.clone(startNodes);

}