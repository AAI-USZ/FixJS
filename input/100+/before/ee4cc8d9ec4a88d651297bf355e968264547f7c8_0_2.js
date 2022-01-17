function (tid, age, profile, baseRating, pot, draftYear) {
        this.rating = {};
        this.rating.pot = pot;
        this.attribute = {};
        this.attribute.tid = tid;
        this.attribute.rosterOrder = 666;  // Will be set later
        this.attribute.draftYear = draftYear;
        this.generateRatings(profile, baseRating);
        this.generateAttributes(age);
        this.attribute.draftPot = pot;
        this.attribute.draftOvr = this.ovr();
    }