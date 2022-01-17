function (tid, age, profile, baseRating, pot, draftYear) {
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
    }