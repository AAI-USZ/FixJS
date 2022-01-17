function (tid, age, profile, baseRating, pot, draftYear) {
        var c, maxHgt, minHgt, maxWeight, minWeight, nationality;

        this.p = {}; // Will be saved to database
        this.p.tid = tid;
        this.p.statsTids = [];
        this.p.stats = [];
        if (tid >= 0) {
            this.p.statsTids.push(tid);
            this.p.stats.push({season: g.startingSeason, tid: this.p.tid, playoffs: false, gp: 0, gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, trb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0});
        }
        this.p.rosterOrder = 666;  // Will be set later
        this.p.ratings = [];
        this.p.ratings.push(generateRatings(profile, baseRating, pot));

        minHgt = 69;  // 5'9"
        maxHgt = 89;  // 7'5"
        minWeight = 150;
        maxWeight = 290;

        this.p.pos = pos(this.p.ratings[0]);  // Position (PG, SG, SF, PF, C, G, GF, FC)
        this.p.hgt = parseInt(random.gauss(1, 0.02) * (this.p.ratings[0].hgt * (maxHgt - minHgt) / 100 + minHgt), 10);  // Height in inches (from minHgt to maxHgt)
        this.p.weight = parseInt(random.gauss(1, 0.02) * ((this.p.ratings[0].hgt + 0.5 * this.p.ratings[0].stre) * (maxWeight - minWeight) / 150 + minWeight), 10);  // Weight in pounds (from minWeight to maxWeight)
        if (g.hasOwnProperty('season')) {
            this.p.bornYear = g.season - age;
        } else {
            this.p.bornYear = g.startingSeason - age;
        }

        // Randomly choose nationality  
        nationality = 'USA';

        this.p.bornLoc = nationality;
        this.p.name = name(nationality);

        this.p.college = 0;
        this.p.draftRound = 0;
        this.p.draftPick = 0;
        this.p.draftTid = 0;
        this.p.draftYear = draftYear;
        c = contract(this.p.ratings[0]);
        this.p.contractAmount = c.amount;
        this.p.contractExp = c.exp;

        this.p.freeAgentTimesAsked = 0;
        this.p.yearsFreeAgent = 0;


        this.p.draftPot = pot;
        this.p.draftOvr = this.p.ratings[0].ovr;
    }