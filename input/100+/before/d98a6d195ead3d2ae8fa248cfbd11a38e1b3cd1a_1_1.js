function Aa(a,b,c,d){var e=j;if(a===b)return j;else if(N(b)&&C(a))return r(b).test(a);else if(K(b))return b.apply(c,d);else if(ja(b)&&ka(a)){z(b,function(g){Aa(a[g],b[g],c,[a[g],a])||(e=m)});return o.keys(b).length>0&&e}else return H(a)===H(b)}function T(a,b,c,d){return E(b)?a:K(b)?b.apply(c,d||[]):K(a[b])?a[b].call(a):a[b]}