function generate(tid, age, profile, baseRating, pot, draftYear) {
        var c, maxHgt, minHgt, maxWeight, minWeight, nationality, p;

        p = {}; // Will be saved to database
        p.tid = tid;
        p.statsTids = [];
        p.stats = [];
        if (tid >= 0) {
            p.statsTids.push(tid);
            p.stats.push({season: g.startingSeason, tid: p.tid, playoffs: false, gp: 0, gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, trb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0});
        }
        p.rosterOrder = 666;  // Will be set later
        p.ratings = [];
        p.ratings.push(generateRatings(profile, baseRating, pot));

        minHgt = 69;  // 5'9"
        maxHgt = 89;  // 7'5"
        minWeight = 150;
        maxWeight = 290;

        p.pos = pos(p.ratings[0]);  // Position (PG, SG, SF, PF, C, G, GF, FC)
        p.hgt = parseInt(random.gauss(1, 0.02) * (p.ratings[0].hgt * (maxHgt - minHgt) / 100 + minHgt), 10);  // Height in inches (from minHgt to maxHgt)
        p.weight = parseInt(random.gauss(1, 0.02) * ((p.ratings[0].hgt + 0.5 * p.ratings[0].stre) * (maxWeight - minWeight) / 150 + minWeight), 10);  // Weight in pounds (from minWeight to maxWeight)
        if (g.hasOwnProperty('season')) {
            p.bornYear = g.season - age;
        } else {
            p.bornYear = g.startingSeason - age;
        }

        // Randomly choose nationality  
        nationality = 'USA';

        p.bornLoc = nationality;
        p.name = name(nationality);

        p.college = 0;
        p.draftRound = 0;
        p.draftPick = 0;
        p.draftTid = 0;
        p.draftYear = draftYear;
        c = contract(p.ratings[0]);
        p.contractAmount = c.amount;
        p.contractExp = c.exp;

        p.freeAgentTimesAsked = 0;
        p.yearsFreeAgent = 0;

        p.draftPot = pot;
        p.draftOvr = p.ratings[0].ovr;

        return p;
    }