function() {
            var dom = fragment(
                element("p",
                    a("CamelCase", "CamelCase"),
                    " ", element("tt", "CamelCase"), " ",
                    a("FooBarA", "FooBarA"), " FOo ",
                    a("FoobarA", "FoobarA"), " ",
                    a("<ParentLink", "<ParentLink"), " ",
                    a(">ChildLink", ">ChildLink"), " ",
                    a(".AbsoluteLink", ".AbsoluteLink"), " ",
                    a(".AbsoluteLink.WikiPage", ".AbsoluteLink.WikiPage"),
                    " OneÅngström Oneångström setTextColor"));
            generateFragment.call(this, dom, 
                "CamelCase !-CamelCase-! FooBarA FOo FoobarA <ParentLink >ChildLink .AbsoluteLink .AbsoluteLink.WikiPage OneÅngström Oneångström setTextColor");
        }