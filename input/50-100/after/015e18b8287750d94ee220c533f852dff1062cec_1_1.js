function( x, y )
{
    if( cp._reuse_v_index == 0 ) {
        cp._reuse_v0[0] = x;
        cp._reuse_v0[1] = y;
        cp._reuse_v_index = 1;
        return cp._reuse_v0;
    } else {
        cp._reuse_v1[0] = x;
        cp._reuse_v1[1] = y;
        cp._reuse_v_index = 0;
        return cp._reuse_v1;
    }
}