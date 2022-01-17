function eulerPhi(n){
  if(n<3) return 1;
  if(n==3) return 2;
  if(eulerPhiTable[n]) return eulerPhiTable[n];
  var retValue=0;
  if(n%2==0) retValue = (n%4==0?2:1)*eulerPhi(n/2);
  else if(n%3==0) retValue = (n%9==0?3:2)*eulerPhi(n/3);
  else{
    var i=5,ns=~~Math.sqrt(n),t,j=0;
    while(i<=ns&&retValue==0){
      if(n%i==0){
        t=n;
        while(t%i==0){t/=i;j++;}
        retValue = eulerPhi(t)*(i-1)*Math.pow(i,j-1);
      }
      i+=(i%6==1)?4:2;
    }
    if(retValue==0) retValue=n-1;
  }
  eulerPhiTable[n] = retValue; return retValue;
}