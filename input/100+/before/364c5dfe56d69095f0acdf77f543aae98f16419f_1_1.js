function(J){var Q,O,P,E,N,L,F,H,G;H=J.length>>>0;Q=Math.max(0,Math.min(A,H));
O=[];E=h();P=x(E,y,z,B);function M(R){N(R);}function K(R){L(R);}function I(R){F(R);
}function D(){N=L=F=l;}if(!Q){E.resolve(O);}else{N=function(R){O.push(R);if(!--Q){D();
E.resolve(O);}};L=function(R){D();E.reject(R);};F=E.progress;for(G=0;G<H;++G){if(G in J){x(J[G],M,K,I);
}}}return P;});}function d(B,y,z,A){