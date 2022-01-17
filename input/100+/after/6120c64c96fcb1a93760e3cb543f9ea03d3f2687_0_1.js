function ProfileManager(metadata)
{
    // Main sysfs files (card 0,1)

    this.file = [] ;
    this.file[0] = "/sys/class/drm/card0/device/performance_level" ;
    this.file[1] = "/sys/class/drm/card1/device/performance_level" ;
    this.second_card = this.file[1] ;

    // Paths to sysfs dirs 

    this.path = [] ;
    this.path[0] = "/sys/class/drm/card0/device/" ;
    this.path[1] = "/sys/class/drm/card1/device/" ;

    this.perflvls = 0;

    if (CheckForNVFile(this.file[0])) {
    	this.perflvls = AvailPerflvls(this.path[0]); 
	this.cardno = 0;
    } else if(this.perflvls == 0 && CheckForNVFile(this.second_card)) {
	this.perflvls = AvailPerflvls(this.path[1]);
	this.cardno = 1;
    }

    nv_log( this.perflvls + " available Performance Levels : ") ;

    if ( this.perflvls == 0 ) 
    { 
    	nv_log("No performance levels are available on this card. Maybe not using nouveau?");
	    return 0;
    }

    this.Icon = Clutter.Texture.new_from_file(_(metadata.path + "/nun.svg"));

    //this.Icon = [] ;
    //for ( let pl = 0; pl < this.perflvls ; pl++) {
    // 	this.Icon[pl] = Clutter.Texture.new_from_file(_(metadata.path+"/icons/nv_p" + pl + ".png"));
    //}
 
    this._init();

    return 1;
}