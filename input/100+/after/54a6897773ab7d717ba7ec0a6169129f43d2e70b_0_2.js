function () {
        var arrCont, arrItems, field;
        priv.ns._reset();

        field = priv.genField("numbers", {
            "type": "array",
            "title": "Nums",
            "items": {
                "type": "number"
            }
        });

        equal(field.div.id, priv.ns.id("numbers", true, 0));
        equal(field.div["class"], priv.ns.classes("field", "numbers", "array"));
        ok(field.div.$childs[0].label);
        ok(field.div.$childs[1].div);
        arrCont = field.div.$childs[1].div;

        equal(arrCont["class"], ns.classes("field", "numbers", "array"));
        equal(arrCont.$childs.length, 2);
        equal(arrCont.$childs[0].div["class"], ns.cls("array-items"));
        equal(arrCont.$childs[1].div["class"], ns.cls("array-actions"));

        equal(arrCont.$childs[0].div["class"], ns.cls("array-items"));

        arrItems = arrCont.$childs[0].div;

        equal(arrItems.$childs.length, 1);
        equal(arrItems.$childs[0].div["class"], ns.cls("array-item"));
        ok(arrItems.$childs[0].div.$childs[0].input);
    }