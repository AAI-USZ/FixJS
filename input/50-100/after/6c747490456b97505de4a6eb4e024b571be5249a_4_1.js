function GCD(x,y){
  if(x<0) return GCD(-x,y); if(x<y) return GCD(y,x);
  if(y==0) return x; if(y==1) return 1;
  return GCD(y,x%y);
}