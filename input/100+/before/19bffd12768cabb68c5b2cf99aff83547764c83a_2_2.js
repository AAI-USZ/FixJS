function () {
        var complexJson = "{ \
                         \"nodes\": \
                         [ \
                             { \"id\": \"author2\", \"label\": \"Author 2\",  \"class\": \"author\" }, \
                             { \"id\": \"paperA\", \"label\": \"Paper A\", \"class\": \"paper\"  }, \
                             { \"id\": \"paperB\", \"label\": \"Paper B\", \"class\": \"paper\"  }, \
                             { \"id\": \"paperC\", \"label\": \"Paper C\", \"class\": \"paper\"  }, \
                             { \"id\": \"conferenceA\", \"label\": \"Conf A\", \"class\": \"conference\" }, \
                             { \"id\": \"conferenceB\", \"label\": \"Conf B\", \"class\": \"conference\" } \
                         ], \
                         \"edges\": \
                         [ \
                             { \"id\": \"edge1\", \"from\": { \"$ref\": \"author2\" }, \"to\": { \"$ref\": \"paperA\" }, \"class\": \"authorship\" }, \
                             { \"id\": \"edge2\", \"from\": { \"$ref\": \"paperA\" }, \"to\": { \"$ref\": \"paperB\" }, \"class\": \"citation\" }, \
                             { \"id\": \"edge3\", \"from\": { \"$ref\": \"paperA\" }, \"to\": { \"$ref\": \"paperC\" }, \"class\": \"citation\" }, \
                             { \"id\": \"edge4\", \"from\": { \"$ref\": \"paperB\" }, \"to\": { \"$ref\": \"conferenceA\" }, \"class\": \"presentation\" }, \
                             { \"id\": \"edge5\", \"from\": { \"$ref\": \"paperC\" }, \"to\": { \"$ref\": \"conferenceA\" }, \"class\": \"presentation\" }, \
                             { \"id\": \"edge6\", \"from\": { \"$ref\": \"paperA\" }, \"to\": { \"$ref\": \"conferenceA\" }, \"class\": \"presentation\" } \
                         ], \
                         \"paths\": \
                         [ \
                             { \"id\": \"path1\", \"edges\": [ { \"$ref\": \"edge1\" }, { \"$ref\": \"edge3\" }, { \"$ref\": \"edge5\" } ] }, \
                             { \"id\": \"path2\", \"edges\": [ { \"$ref\": \"edge1\" }, { \"$ref\": \"edge2\" }, { \"$ref\": \"edge4\" } ] }, \
                             { \"id\": \"path3\", \"edges\": [ { \"$ref\": \"edge1\" }, { \"$ref\": \"edge6\" }] } \
                         ] \
                      }",
            $fixture = $("#qunit-fixture"),
            c = { drawingArea: $fixture };

        ok(adore, "Global ADORE object exists.");

        equal(adore.getActivePathIndex(), -1,
            "activePathIndex has correct initial value of -1.");
        equal(adore.getPathCount(), -1,
            "pathCount has correct initial value of -1.");

        adore.setConfig(c);
        adore.setJsonData(complexJson);

        equal(adore.getPathCount(), 3,
            "after setJsonData() pathCount has correct value of 3.");
        equal(adore.getActivePathIndex(), -1,
            "and activePathIndex has correct value of -1");

        adore.drawFromJson();
        equal(adore.getActivePathIndex(), 0,
            "after drawfromJson() activePathIndex has correct value of 0.");
        equal($fixture.children(".path").length, 3,
            "and 3 paths div's have been appended to the drawing area.");
    }