function() {
            var dom = fragment(
                element("h1", "Heading 1"),
                element("h2", { id: "anchor-2" }, "Heading 2"),
                element("h3", element("b", "Heading"), " ", element("i", "3")),
                element("h4", { id: "アンカー-4" },
                    "Heading 4 with ",
                    a("wiki:WikiStart", "WikiStart")),
                element("h5", "Heading 5"),
                element("h6", { id: "anchor-6" }, "Heading 6"));
            generateFragment.call(this, dom, [
                "!1 Heading 1  ",
                "!2 Heading 2    #anchor-2",
                "!3 '''Heading''' ''3''    ",
                "!4 Heading 4 with WikiStart      #アンカー-4",
                "!5 Heading 5      ",
                "!6 Heading 6        #anchor-6" ].join("\n"));
        }