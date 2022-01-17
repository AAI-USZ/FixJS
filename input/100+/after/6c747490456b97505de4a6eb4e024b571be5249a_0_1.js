function sumDivs(n){
  if(n<2) return 1;
  var x=n,s=1,t,i=3;
  while(n%2==0) n/=2,s=2*s+1;
  while(i*i<=n){
    t=s; while(n%i==0) n/=i,s=i*s+t; i+=2;
  }
  if(n>1) s*=(n+1); return s-x;
}