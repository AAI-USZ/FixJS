function () {
        var oldArray = ["A", "B"];
        var newArray = ["A", "A2", "A3", "B", "B2"];
        var compareResult = ko.utils.compareArrays(oldArray, newArray);
        value_of(compareResult).should_be([
            { status: "retained", value: "A" },
            { status: "added", value: "A2" },
            { status: "added", value: "A3" },
            { status: "retained", value: "B" },
            { status: "added", value: "B2" }
        ]);
    }