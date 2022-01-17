function()
{
    /*utils_.AddBase64Audio(this.name_.toLowerCase() + ".js");*/
    stuffLoader_.Queue(this.name_.toLowerCase() + ".js",RESOURCE_TYPES.BASE64AUDIO);
    stuffLoader_.Queue("dizzy.js",RESOURCE_TYPES.BASE64AUDIO);
    stuffLoader_.Queue("images/misc/" + this.folder_.toLowerCase() + "/sprites.png",RESOURCE_TYPES.IMAGE);
    stuffLoader_.Queue("images/misc/" + this.folder_.toLowerCase() + "/misc-sprites.png",RESOURCE_TYPES.IMAGE);
    stuffLoader_.Queue("images/misc/" + this.folder_.toLowerCase() + "/trail-sprites.png",RESOURCE_TYPES.IMAGE);
    if(this.projectiles_.length > 0)
        stuffLoader_.Queue("images/misc/" + this.folder_.toLowerCase() + "/projectiles.png",RESOURCE_TYPES.IMAGE);
}