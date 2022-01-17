function sumDivs(n){
  var s=0,i=2;
  while(i*i<=n){
    if(n%i==0) if(i*i!=n) s+=i+n/i; else s+=i;
    i++;
  }
  return s+1;
}