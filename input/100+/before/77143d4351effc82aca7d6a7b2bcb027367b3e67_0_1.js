function getData() {
        var i,
            len,
            name,
            interestArray = [],
            interest,
            interests = testData.object.interests;

        for (i = 0, len = interests.length; i < len; i++) {
            interest = interests[i];
            name = Beancounter.getNameFromResource(interest.resource);
            interestArray.push({
                'name': name,
                'weight': Math.abs((interest.weight * 10) + random())
            });
        }

        return interestArray;
    }