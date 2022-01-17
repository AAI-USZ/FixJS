function getData(profile) {
        var i,
            len,
            name,
            interestArray = [],
            interest,
            interests = profile.object.interests;

        for (i = 0, len = interests.length; i < len; i++) {
            interest = interests[i];
            name = Beancounter.getNameFromResource(interest.resource);
            interestArray.push({
                'name': name,
                'weight': interest.weight * 100
            });
        }

        return interestArray;
    }