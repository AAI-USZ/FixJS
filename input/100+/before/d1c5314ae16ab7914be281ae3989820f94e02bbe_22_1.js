function(x) {
    /* Remove leading and trailing padding. Split on the decimal separator. */
    var s = String(x)
        .replace(new RegExp("^(" + re_quote(padi) + ")*"), "")
        .replace(new RegExp("(" + re_quote(padf) + ")*$"), "")
        .split(decimal);

    /* Remove grouping and truncate the integral part. */
    var i = s[0].replace(new RegExp(re_quote(group), "g"), "");
    if (i.length > maxi) i = i.substring(i.length - maxi);

    /* Round the fractional part. */
    var f = s[1] ? Number("0." + s[1]) : 0;
    if (Infinity > maxf) f = Math.round(f * maxk) / maxk;

    return Math.round(i) + f;
  }