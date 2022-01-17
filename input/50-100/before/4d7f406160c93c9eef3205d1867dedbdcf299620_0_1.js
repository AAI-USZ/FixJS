function(time,callback)
{
    //if popcornPlayer is defined then player type is in the list ['video','audio','image','text']
    if(this.popcornPlayer)
        this.popcornPlayer.cue(time,callback);
}