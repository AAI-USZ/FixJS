function () {
        var oldArray = ["A", "B", "C", "D", "E"];
        var newArray = [123, "A", "E", "C", "D"];
        var compareResult = ko.utils.compareArrays(oldArray, newArray);
        value_of(compareResult).should_be([
            { status: "added", value: 123 },
            { status: "retained", value: "A" },
            { status: "deleted", value: "B" },
            { status: "added", value: "E" },
            { status: "retained", value: "C" },
            { status: "retained", value: "D" },
            { status: "deleted", value: "E" }
        ]);
    }