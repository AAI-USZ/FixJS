function(playerStore) {
        var row;

        row = this.attribute;
        row.ratings = [this.rating];
        row.ratings[0].season = g.startingSeason;
        row.ratings[0].ovr = this.ovr();
        row.stats = [{season: g.startingSeason, playoffs: false, gp: 0, gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, trb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0}];
        playerStore.add(row);
    }