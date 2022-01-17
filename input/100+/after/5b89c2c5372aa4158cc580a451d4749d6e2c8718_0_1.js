function() {
            var dom = fragment(
                element("div", { "class": "collapsable" },
                    element("p", "title"),
                    element("p", "Text"),
                    element("ul",
                        element("li", "item 1"),
                        element("li", "item 2")),
                    element("p", "More text")
                ),
                element("p", br()));
            generateFragment.call(this, dom, [
                "!*** title",
                "Text",
                " * item 1",
                " * item 2",
                "More text",
                "*!"].join("\n"));
            generateWikitext.call(this, dom, [
                "!*** title",
                "",
                "Text",
                "",
                " * item 1",
                " * item 2",
                "",
                "More text",
                "",
                "*!"].join("\n"));
        }