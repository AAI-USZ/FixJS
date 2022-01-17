function (random) {
    "use strict";

    function Player() {
    }

    /**
     * Load existing player's current ratings and attributes from the database.
     */
    Player.prototype.load = function () {
/*        r = g.dbex('SELECT * FROM player_ratings WHERE pid = :pid AND season = :season', pid=pid, season=g.season)
        this.rating = dict(r.fetchone())
        r = g.dbex('SELECT * FROM player_attributes WHERE pid = :pid', pid=pid)
        this.attribute = dict(r.fetchone())*/
    };

    Player.prototype.save = function (playerStore) {
        var row;

        row = this.attribute;
        row.ratings = [this.rating];
        row.ratings[0].season = g.startingSeason;
        row.ratings[0].ovr = this.ovr();
        if (this.attribute.tid >= 0) {
            row.stats = [{season: g.startingSeason, tid: this.attribute.tid, playoffs: false, gp: 0, gs: 0, min: 0, fg: 0, fga: 0, tp: 0, tpa: 0, ft: 0, fta: 0, orb: 0, drb: 0, trb: 0, ast: 0, tov: 0, stl: 0, blk: 0, pf: 0, pts: 0}];
        } else {
            row.stats = [];
        }

        playerStore.add(row);
    };

    /**
     * Develop (increase/decrease) player's ratings.
     * @param {number} years Number of years to develop (default 1).
     * @param {generate} generate Generating a new player? (default false). If true, then
     *     the player's age is also updated based on years.
     */
    Player.prototype.develop = function (years, generate) {
        var age, i, increase, j, key, ovr, plusMinus, pot, ratingKeys;

        years = typeof years !== "undefined" ? years : 1;
        generate = typeof generate !== "undefined" ? generate : false;

        // Make sure age is always defined
        if (g.hasOwnProperty('season')) {
            age = g.season - this.attribute.bornYear;
        } else {
            age = g.startingSeason - this.attribute.bornYear;
        }

        for (i = 0; i < years; i++) {
            age += 1;
            pot = random.gauss(this.rating.pot, 5);
            ovr = this.ovr();

            ratingKeys = ['stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'];
            for (j = 0; j < ratingKeys.length; j++) {
                key = ratingKeys[j];
                plusMinus = 28 - age;
                if (plusMinus > 0) {
                    if (pot > ovr) {
                        // Cap potential growth
                        if (pot - ovr < 20) {
                            plusMinus *= (pot - ovr) / 20.0 + 0.5;
                        } else {
                            plusMinus *= 1.5;
                        }
                    } else {
                        plusMinus *= 0.5;
                    }
                } else {
                    plusMinus *= 30.0 / pot;
                }
                increase = random.gauss(1, 2) * plusMinus;
                //increase = plusMinus
                this.rating[key] = this._limitRating(this.rating[key] + increase);
            }

            // Update potential
            ovr = this.ovr();
            this.rating.pot += -2 + parseInt(random.gauss(0, 2), 10);
            if (ovr > this.rating.pot || age > 28) {
                this.rating.pot = ovr;
            }
        }

        if (generate) {
            if (g.hasOwnProperty('season')) {
                age = g.season - this.attribute.bornYear + years;
                this.attribute.bornYear = g.season - age;
            } else {
                age = g.startingSeason - this.attribute.bornYear + years;
                this.attribute.bornYear = g.startingSeason - age;
            }
        }
    };

    /**
     * Add or subtract amount from all ratings.
     * @param {number} amount Number to be added to each rating (can be negative).
     */
    Player.prototype.bonus = function (amount) {
        var i, key, ratingKeys;

        ratingKeys = ['stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb', 'pot'];
        for (i = 0; i < ratingKeys.length; i++) {
            key = ratingKeys[i];
            this.rating[key] = this._limitRating(this.rating[key] + amount);
        }
    };

    Player.prototype._limitRating = function (rating) {
        if (rating > 100) {
            return 100;
        }
        if (rating < 0) {
            return 0;
        }
        return parseInt(rating, 10);
    };

    /**
     * Calculates the overall rating by averaging together all the other ratings.
     * @return {number} Overall rating.
     */
    Player.prototype.ovr = function () {
        return parseInt((this.rating.hgt + this.rating.stre + this.rating.spd + this.rating.jmp + this.rating.endu + this.rating.ins + this.rating.dnk + this.rating.ft + this.rating.fg + this.rating.tp + this.rating.blk + this.rating.stl + this.rating.drb + this.rating.pss + this.rating.reb) / 15, 10);
    };

    Player.prototype.contract = function (randomizeExp) {
        var amount, expiration, maxAmount, minAmount, ovr, potentialDifference, years;
        randomizeExp = typeof randomizeExp !== "undefined" ? randomizeExp : false;

        // Limits on yearly contract amount, in $1000's
        minAmount = 500;
        maxAmount = 20000;

        ovr = this.ovr();
        // Scale amount from 500k to 15mil, proportional to (ovr*2 + pot)*0.5 120-210
        amount = ((2.0 * ovr + this.rating.pot) * 0.85 - 120) / (210 - 120);  // Scale from 0 to 1 (approx)
        amount = amount * (maxAmount - minAmount) + minAmount;  // Scale from 500k to 15mil
        amount *= random.gauss(1, 0.1);  // Randomize

        // Expiration
        // Players with high potentials want short contracts
        potentialDifference = Math.round((this.rating.pot - ovr) / 4.0);
        years = 5 - potentialDifference;
        if (years < 2) {
            years = 2;
        }
        // Bad players can only ask for short deals
        if (this.rating.pot < 40) {
            years = 1;
        } else if (this.rating.pot < 50) {
            years = 2;
        } else if (this.rating.pot < 60) {
            years = 3;
        }

        // Randomize expiration for contracts generated at beginning of new game
        if (randomizeExp) {
            years = random.randInt(1, years);
        }

        if (g.hasOwnProperty('season')) {
            expiration = g.season + years - 1;
        } else {
            expiration = g.startingSeason + years - 1;
        }
        if (amount < minAmount) {
            amount = minAmount;
        } else if (amount > maxAmount) {
            amount = maxAmount;
        } else {
            amount = 50 * Math.round(amount / 50);  // Make it a multiple of 50k
        }

        return {"amount": amount, "exp": expiration};
    };

    /**
     * Adds player to the free agents list.
     * 
     * This should be THE ONLY way that players are added to the free agents
     * list, because this will also calculate their demanded contract. But
     * currently, the free agents generated at the beginning of the game don't
     * use this function.
     */
    Player.prototype.addToFreeAgents = function (phase) {
        var contract, expiration;

        phase = typeof phase !== "undefined" ? phase : g.phase;

        // Player's desired contract
        contract = this.contract();

        // During regular season, or before season starts, allow contracts for
        // just this year.
        if (g.phase > c.PHASE_AFTER_TRADE_DEADLINE) {
            expiration += 1;
        }

//        g.dbex('UPDATE player_attributes SET tid = :tid, contractAmount = :contractAmount, contractExp = :contractExp, free_agent_times_asked = 0 WHERE pid = :pid', tid=c.PLAYER_FREE_AGENT, contractAmount=contract.amount, contractExp=contract.exp, pid=this.id)
    };

    /**
     * Release player.
     * 
     * This keeps track of what the player's current team owes him, and then
     * calls this.addToFreeAgents.
     */
    Player.prototype.release = function () {
        // Keep track of player salary even when he's off the team
/*        r = g.dbex('SELECT contractAmount, contractExp, tid FROM player_attributes WHERE pid = :pid', pid=this.id)
        contractAmount, contractExp, tid = r.fetchone()
        g.dbex('INSERT INTO released_players_salaries (pid, tid, contractAmount, contractExp) VALUES (:pid, :tid, :contractAmount, :contractExp)', pid=this.id, tid=tid, contractAmount=contractAmount, contractExp=contractExp)*/

        this.addToFreeAgents();
    };

    Player.prototype.generate = function (tid, age, profile, baseRating, pot, draftYear) {
        this.rating = {};
        this.rating.pot = pot;
        this.attribute = {};
        this.attribute.tid = tid;
        if (tid >= 0) {
            this.attribute.statsTids = [tid];
        } else {
            this.attribute.statsTids = [];
        }
        this.attribute.rosterOrder = 666;  // Will be set later
        this.attribute.draftYear = draftYear;
        this.generateRatings(profile, baseRating);
        this.generateAttributes(age);
        this.attribute.draftPot = pot;
        this.attribute.draftOvr = this.ovr();
    };

    Player.prototype.generateRatings = function (profile, baseRating) {
        var i, key, profileId, profiles, rating, ratingKeys, ratings, sigmas;

        if (profile === 'Point') {
            profileId = 1;
        } else if (profile === 'Wing') {
            profileId = 2;
        } else if (profile === 'Big') {
            profileId = 3;
        } else {
            profileId = 0;
        }

        // Each row should sum to ~150
        profiles = [[10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10,  10],  // Base 
                    [-30, -10, 40,  15,  0,   0,   0,   10,  15,  0,   0,   20,  40,  40,  0],   // Point Guard
                    [10,  10,  15,  15,  0,   0,   25,  15,  15,  5,   0,   10,  15,  0,   15],  // Wing
                    [40,  30,  -10, -10, 10,  30,  30,  0,   -10, -20, 30,  0,   -10, -10, 30]];  // Big
        sigmas = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        baseRating = random.gauss(baseRating, 5);

        ratings = [];
        for (i = 0; i < sigmas.length; i++) {
            rating = profiles[profileId][i] + baseRating;
            ratings[i] = this._limitRating(random.gauss(rating, sigmas[i]));
        }

        ratingKeys = ['hgt', 'stre', 'spd', 'jmp', 'endu', 'ins', 'dnk', 'ft', 'fg', 'tp', 'blk', 'stl', 'drb', 'pss', 'reb'];
        for (i = 0; i < ratingKeys.length; i++) {
            key = ratingKeys[i];
            this.rating[key] = ratings[i];
        }
    };

    // Call generate_ratings before this method!
    Player.prototype.generateAttributes = function (age, player_nat) {
        var contract, maxHgt, minHgt, maxWeight, minWeight, nationality;

        minHgt = 69;  // 5'9"
        maxHgt = 89;  // 7'5"
        minWeight = 150;
        maxWeight = 290;

        this.attribute.pos = this._pos();  // Position (PG, SG, SF, PF, C, G, GF, FC)
        this.attribute.hgt = parseInt(random.gauss(1, 0.02) * (this.rating.hgt * (maxHgt - minHgt) / 100 + minHgt), 10);  // Height in inches (from minHgt to maxHgt)
        this.attribute.weight = parseInt(random.gauss(1, 0.02) * ((this.rating.hgt + 0.5 * this.rating.stre) * (maxWeight - minWeight) / 150 + minWeight), 10);  // Weight in pounds (from minWeight to maxWeight)
        if (g.hasOwnProperty('season')) {
            this.attribute.bornYear = g.season - age;
        } else {
            this.attribute.bornYear = g.startingSeason - age;
        }

        // Randomly choose nationality	
        nationality = 'USA';

        this.attribute.bornLoc = nationality;
        this.attribute.name = this._name(nationality);

        this.attribute.college = 0;
        this.attribute.draftRound = 0;
        this.attribute.draftPick = 0;
        this.attribute.draftTid = 0;
        contract = this.contract();
        this.attribute.contractAmount = contract.amount;
        this.attribute.contractExp = contract.exp;

        this.attribute.freeAgentTimesAsked = 0;
        this.attribute.yearsFreeAgent = 0;
    };

    Player.prototype._name = function (nationality) {
        var fn, ln;

        fn = "Bob";
        ln = "Johnson";
    /*
            // First name
            fn_rand = random.uniform(0, this.fn_max)
            for row in this.fn_data:
                if row[4].upper() == nationality.upper():
                    if float(row[2]) >= fn_rand:
                        break
            fn = string.capitalize(row[0])

            // Last name
            ln_rand = random.uniform(0, this.ln_max)
            for row in this.ln_data:
                if row[4].upper() == nationality.upper():
                    if float(row[2]) >= ln_rand:
                    //   if (random.random() < 0.3):  // This is needed because there are some duplicate CDF's in last_names.txt
                        break
            ln = string.capitalize(row[0])
            // McWhatever
            if len(ln) > 3:
                ln = re.sub('^Mc(\w)', 'Mc' + ln[2].upper(), ln)
    */
        return fn + " " + ln;
    };

    /**
     * Assign a position (PG, SG, SF, PF, C, G, GF, FC) based on ratings.
     */
    Player.prototype._pos = function (nationality) {
        var c, g, pf, pg, pos, sf, sg;

        g = false;
        pg = false;
        sg = false;
        sf = false;
        pf = false;
        c = false;

        // Default position
        if (this.rating.drb >= 50) {
            pos = 'GF';
        } else {
            pos = 'F';
        }

        if (this.rating.hgt <= 30 || this.rating.spd >= 85) {
            g = true;
            if ((this.rating.pss + this.rating.drb) >= 100) {
                pg = true;
            }
            if (this.rating.hgt >= 30) {
                sg = true;
            }
        }
        if (this.rating.hgt >= 50 && this.rating.hgt <= 65 && this.rating.spd >= 40) {
            sf = true;
        }
        if (this.rating.hgt >= 70) {
            pf = true;
        }
        if ((this.rating.hgt + this.rating.stre) >= 130) {
            c = true;
        }

        if (pg && !sg && !sf && !pf && !c) {
            pos = 'PG';
        } else if (!pg && (g || sg) && !sf && !pf && !c) {
            pos = 'SG';
        } else if (!pg && !sg && sf && !pf && !c) {
            pos = 'SF';
        } else if (!pg && !sg && !sf && pf && !c) {
            pos = 'PF';
        } else if (!pg && !sg && !sf && !pf && c) {
            pos = 'C';
        }

        // Multiple poss
        if ((pf || sf) && g) {
            pos = 'GF';
        } else if (c && (pf || sf)) {
            pos = 'FC';
        } else if (pg && sg) {
            pos = 'G';
        }
        if (pos === 'F' && this.rating.drb <= 20) {
            pos = 'PF';
        }

        return pos;
    };

    return {
        Player: Player
    };
}