function numFactors(n){
  if(x[n]) return x[n];
  if(n<4) return 1;
  var a = 0;
  if(n%2 == 0){
    a=1;
    while(n%2==0) n/=2;
  }
  if(n%3 == 0){
    a++;
    while(n%3==0) n/=3;
  }
  var p=5;
  while(p<=n){
    if(n%p==0){
      a++;
      while(n%p==0)n/=p;
    }
    p+=(p%6==1?4:2);
  }
  return a;
}