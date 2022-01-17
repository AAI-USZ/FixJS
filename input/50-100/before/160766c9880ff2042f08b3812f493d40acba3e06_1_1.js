function(){
    console.log('launched');
play.sound({
    file :__dirname + '/two.mp3',
    volume : 0,
    soundcard : 'hw:0,0'
});

play.increaseSlowly(function() {
    //process.exit(1);
});
    
}