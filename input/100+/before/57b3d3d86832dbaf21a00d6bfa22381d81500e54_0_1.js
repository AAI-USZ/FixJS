function () {
        $target = $("#ex-basic", doc);
        text = "exception SuperStar {\n};";
        expect($target.text()).toEqual(text);
        expect($target.find(".idlException").length).toEqual(1);
        expect($target.find(".idlExceptionID").text()).toEqual("SuperStar");

        $target = $("#ex-inherit", doc);
        text = "exception SuperStar : HyperStar {\n};";
        expect($target.text()).toEqual(text);
        expect($target.find(".idlSuperclass").text()).toEqual("HyperStar");

        $target = $("#ex-fields", doc);
        text =  "exception SuperStar {\n" +
                "    [Something]\n" +
                "    const long value = 42;\n" +
                "    Object?         message;\n" +
                "    sequence<float> floats;\n" +
                "    long[]          numbers;\n" +
                "};";
        expect($target.text()).toEqual(text);
        expect($target.find(".idlConst").length).toEqual(1);
        expect($target.find(".idlField").length).toEqual(3);
        var $const = $target.find(".idlConst");
        expect($const.find(".idlConstType").text()).toEqual("long");
        expect($const.find(".idlConstName").text()).toEqual("value");
        expect($const.find(".idlConstValue").text()).toEqual("42");
        var $fld = $target.find(".idlField").first();
        expect($fld.find(".idlFieldType a").text()).toEqual("Object");
        expect($fld.find(".idlFieldName").text()).toEqual("message");

        var $sec = $("#fields dl.fields", doc);
        expect($sec.find("dt").length).toEqual(3);
        expect($sec.find("dd").length).toEqual(3);
        expect($sec.find("dt").first().find("code").first().text()).toEqual("floats");
        expect($sec.find("dt").first().find(".idlFieldType a").text()).toEqual("float");
        expect($sec.find("dd").first().text()).toEqual("3");

        $sec = $("#constants-2 dl.constants", doc);
        expect($sec.find("dt").length).toEqual(1);
        expect($sec.find("dd").length).toEqual(1);
        expect($sec.find("dt").first().find("code").first().text()).toEqual("value");
        expect($sec.find("dt").first().find(".idlConstType a").text()).toEqual("long");
        expect($sec.find("dd").first().text()).toEqual("1");
    }