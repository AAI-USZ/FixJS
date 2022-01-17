function __constructURLPart(myarr) {
    var x = "?";
    for (e in myarr)
    {
        x = x + "q=" + myarr[e] + "&";
    }

    x = x.slice(0, x.length - 1);

    return x;
}