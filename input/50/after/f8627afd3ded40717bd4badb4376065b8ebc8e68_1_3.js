function startLoop() {



 laeuft = true;

 loop();

 requestAnimFrame(startLoop);



}