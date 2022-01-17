function ia_red_update(red) {
  if (red.getColor()==1 && !red.seesWater) {red.seesWater=true;}
  if (red.getColor()!=1 && red.seesWater) {red.seesWater=false; red.direction*=-1;}
  red.rotate(red.direction*10);
  red.forward(10);
}