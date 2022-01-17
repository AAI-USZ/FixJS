function() {
        var path = require("path"),
            docSet = parser.parse([path.join(env.dirname, "plugins/test/fixtures/railsTemplate.js.erb")]);

        expect(docSet[2].description).toEqual("Remove rails tags from the source input (e.g. )");
    }