function ccsLPSolve(A,B,y,xj,I,Pinv,P) {
    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
    var Bi = B[0], Bj = B[1], Bv = B[2];
    
    if(typeof xj === "undefined") xj = [];
    function dfs(j) {
        var k,k0,k1;
        if(y[j] !== 0) return;
        y[j] = 1;
        k0 = Ai[Pinv[j]];
        k1 = Ai[Pinv[j]+1];
        for(k=k0;k<k1;++k) dfs(Aj[k]);
        xj[n] = Pinv[j];
        ++n;
    }
    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
    i0 = Bi[I];
    i1 = Bi[I+1];
    for(i=i0;i<i1;++i) { dfs(Bj[i]); }
    xj.length = n;
    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
    for(i=xj.length-1;i!==-1;--i) {
        j = xj[i];
        l = P[j];
        j0 = Ai[j];
        j1 = Ai[j+1];
        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
        a = y[l];
        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
        y[l] = a;
    }
}