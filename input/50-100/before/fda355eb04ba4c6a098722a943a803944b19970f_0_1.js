function() {
            var dom = fragment(
                element("p",
                    a("wiki:CamelCase", "CamelCase"),
                    " ", element("tt", "CamelCase"), " ",
                    a("wiki:FooBarA", "FooBarA"), " FOo ", 
                    a("wiki:FoobarA", "FoobarA"), " ",
                    a("wiki:<ParentLink", "<ParentLink"), " ",
                    a("wiki:>ChildLink", ">ChildLink"), " ",
                    a("wiki:.AbsoluteLink", ".AbsoluteLink"), " ",
                    a("wiki:.AbsoluteLink.WikiPage", ".AbsoluteLink.WikiPage"),
                    " OneÅngström Oneångström setTextColor"));
            generateFragment.call(this, dom, 
                "CamelCase !-CamelCase-! FooBarA FOo FoobarA <ParentLink >ChildLink .AbsoluteLink .AbsoluteLink.WikiPage OneÅngström Oneångström setTextColor");
        }