function Html5Player(p) {
    this.p = p;
    this.popcornPlayer  = undefined;
    this.htmlPlayer = "#" + p.id;
    this.onEnded = undefined;
    
    /*
     * User defined properties
     
     this.propertyMap = 
    {
       "propertyname" : override true / false 
    }
    
    if propertyName is in this.propertyMap then Player.js will
    call a function name setProperty in this player.
    if the value is true than this player override default setProperty behavior
    if the value is false than this player adds some functionality
     
     
     */

    switch (p.source.type.split("/")[0]) {
                            case "video": {
                                    // type = video/*
                                    p.createElement("<video class='player' poster='images/loading.gif' id='" + p.id + "'></video>");	
                                    break;
                            }
                            case "audio": {
                                    // type = audio/*
                                    p.createElement("<audio class='player' id='" + p.id+ "'></audio>");
                                    break;
                            }
                            case "image": {
                                    // type = image/*
                                    p.createElement("<img class='player' id='" + p.id + "'></img>");
                                    break;
                            }
                            case "application": {
                                    switch (p.source.type) {
                                            case "application/x-ginga-settings": {
                                                    // type = application/x-ginga-settings
                                                     p.createElement("<div class='player' id='" + p.id + "'></div>");
                                                    break;
                                            }
                                            case "application/x-ginga-NCLua": {
                                                    // type = application/x-ginga-NCLua
                                                    Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[p.source.type]);
                                                    break;
                                            }
                                            case "application/x-ginga-NCLet": {
                                                    // type = application/x-ginga-NCLet
                                                    Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[p.source.type]);
                                                    break;
                                            }
                                            case "application/x-ginga-time": {
                                                    // type = application/x-ginga-time
                                                    Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[p.source.type]);
                                                    break;
                                            }
                                    }
                                    break;
                            }
                            case "text": {
                                    switch (p.source.type) {
                                            case "text/plain":
                                            case "text/html": {
                                                    // type = text/plain, text/html
                                                    p.createElement("<div class='player' id='" + p.id + "'></div>");
                                                    break;
                                            }
                                            case "text/css": {
                                                    // type = text/css
                                                    Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[p.source.type]);
                                                    break;
                                            }
                                            case "text/xml": {
                                                    // type = text/xml
                                                    Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[p.source.type]);
                                                    break;
                                            }
                                    }
                                    break;
                            }
                    }


                //Tenta criar o popCorn player de acordo com o tipo de media
		if (p.checkType(["video","audio"]))
		{
			do {	
					//this.popcornPlayer = new Popcorn(this.htmlPlayer, { frameAnimation: true });
					this.popcornPlayer = new Popcorn(this.htmlPlayer);	
			} while (!this.popcornPlayer);
		} else if(p.checkType(["image","text"])){
			do {	
					Popcorn.player("baseplayer");
					this.popcornPlayer = new Popcorn.baseplayer(this.htmlPlayer);
					
			} while (!this.popcornPlayer);
		} 
                
                
                
                //events are placed
                $(this.htmlPlayer).on("ended",$.proxy(function() {
                                if(this.onEnded)
                                    this.onEnded();
                },this));
                        
  
}