function(row)
    {
        var expected = Fx13 ?
            "\\s*item6=\\\"6\\\",\\s*item7=\\\"7\\\",\\s*item0=\\\"0\\\",\\s*" + FW.FBL.$STR("firebug.reps.more") + "...\\s*" :
            "\\s*item6=\\\"6\\\",\\s*item3=\\\"3\\\",\\s*" + FW.FBL.$STR("firebug.reps.more") + "...\\s*";

        FBTest.compare(
            new RegExp("\\s*" + FW.FBL.$STRP("firebug.storage.totalItems", [10]) + expected),
            row.textContent, "The local storage must have proper data");
        callback();
    }