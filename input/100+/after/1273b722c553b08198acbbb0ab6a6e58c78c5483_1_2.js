function logTime(){
    currentTime = new Date();
    currentTime = currentTime.getMinutes() + ":" + currentTime.getSeconds();
    log  = log + "\n" + currentTime; 
}