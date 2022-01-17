function (item) {
        return { label: item.name + " from " + item.location, id: item.gymId, match: item.gymName };
    }