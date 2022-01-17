function () {
        var oldArray = ["A", "B", "C", "D", "E"];
        var newArray = ["B", "C", "E"];
        var compareResult = ko.utils.compareArrays(oldArray, newArray);
        value_of(compareResult).should_be([
            { status: "deleted", value: "A" },
            { status: "retained", value: "B" },
            { status: "retained", value: "C" },
            { status: "deleted", value: "D" },
            { status: "retained", value: "E" }
        ]);
    }