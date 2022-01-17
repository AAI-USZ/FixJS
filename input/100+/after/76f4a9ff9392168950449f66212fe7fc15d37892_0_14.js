function prettifyEquality(equality) {
    var eq = equality.toString();
    if (eq[0] === "s") {
        return "<code> \\overline{" + eq.substring(3, 5) + "} = \\overline{" + eq.substring(9, 11) + "}</code>";
    }
    else if (eq[0] === "a") {
        return "<code> \\angle " + eq.substring(3, 6) + " = \\angle " + eq.substring(10, 13) + "</code>";
    }
    else {
        return "<code> \\bigtriangleup " + eq.substring(8, 11) + " = \\bigtriangleup " + eq.substring(20, 23) + "</code>";
    }
}