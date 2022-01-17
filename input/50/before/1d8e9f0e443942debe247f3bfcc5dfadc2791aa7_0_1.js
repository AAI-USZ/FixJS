function u_iswspace(c, _) {
    return [1,0,[c==9 || c==10 || c==13 || c==32]];
}