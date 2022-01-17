function updateWide() {
  if (stopped) return;
  deltaTime=time()-lastUpdateTime;
  lastUpdateTime=time();
  deltaTime*=1; //DEBUG Can be used to accelerate/slow down the game
  //Limit the 'visible' framerate to 10 so that the objects won't 'jump' too quickly when the framerate is very low
  if (deltaTime>0.1) deltaTime=0.1;
  frame++;
  //Update the game model
  updateGod(deltaTime);
}