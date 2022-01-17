function () {
        if (!st.checked) return;
        util.extend(tm, new $jit.Layouts.TM.Strip);
        tm.layout.orientation = "v";
        tm.refresh();
    }