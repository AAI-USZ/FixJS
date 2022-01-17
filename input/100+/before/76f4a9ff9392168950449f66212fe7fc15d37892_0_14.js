function prettifyEquality(equality) {
    var eq = equality.toString();
    if (eq[0] === "s") {
        return "<code> \\overline{" + eq.substring(3, 5) + "} \\cong \\overline{" + eq.substring(9, 11) + "}</code>";
    }
    else if (eq[0] === "a") {
        return "<code> \\angle " + eq.substring(3, 6) + " \\cong \\angle " + eq.substring(10, 13) + "</code>";
    }
    else {
        return "<code> \\triangle " + eq.substring(8, 11) + " \\cong \\triangle " + eq.substring(20, 23) + "</code>";
    }
}