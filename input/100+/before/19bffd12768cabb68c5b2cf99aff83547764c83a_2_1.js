function () {
        var emptyJson = "{}",
        $fixture = $("#qunit-fixture"),
        c = { drawingArea: $fixture };

        ok(adore, "Global ADORE object exists.");

        equal(adore.getActivePathIndex(), -1,
            "activePathIndex has correct initial value of -1.");
        equal(adore.getPathCount(), -1,
            "pathCount has correct initial value of -1.");

        adore.setConfig(c);
        adore.setJsonData(emptyJson);

        equal(adore.getPathCount(), 0,
            "after setJsonData() pathCount hat correct value of 0.");
        equal(adore.getActivePathIndex(), -1,
            "and activePathIndex has correct value of -1.");

        adore.drawFromJson();
        equal($fixture.children().length, 0,
            "after drawFromJson() no paths are appended to the drawing area.")
    }