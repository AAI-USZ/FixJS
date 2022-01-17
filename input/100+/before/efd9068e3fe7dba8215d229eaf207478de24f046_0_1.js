function linspace(a,b,n) {
    if(typeof n === "undefined") n = Math.round(b-a)+1;
    var i,ret = Array(n);
    n--;
    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
    return ret;
}