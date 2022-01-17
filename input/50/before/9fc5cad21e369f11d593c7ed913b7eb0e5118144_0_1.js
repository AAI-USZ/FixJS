function (item) {
        return { label: item.gymName + " from " + item.location, id: item.gymId, match: item.gymName };
    }