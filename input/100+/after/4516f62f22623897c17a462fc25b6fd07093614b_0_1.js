function WebNclPlayer (file, div) {

	var patt=/[\/]*.+\//g;
	this.div = div;
       
	this.presentation = {
				
                 readyToPlay : false,
                 playRequested : false,
                                
        //Time limit used by events, can be changed by the user
		TIME_LIMIT: 1000,
		
//HACK_FOCUS (begin)
		settingsNode : undefined,
//HACK_FOCUS (end)
                
		playerId: ++WebNclPlayer.playerCount,
		playerDiv: div,
		getDivId: function (nodeId, type) {
			// ----- REFER -----
			var mediaId = this.parser.referenceMap.instReuse[nodeId] || nodeId;
			return "ncl" + this.playerId + (type||"") + "_" + mediaId;
			// -----------------
			// return "ncl" + this.playerId + (type||"") + "_" + nodeId;
		},
		path: (file && patt.exec(file)[0]) || '',
                
                //Default media players
                //TODO: Future webncl versions should
                //inspect browser features and choose the
                //best players for the browser
                //MediaPlayers can be changed by the user
                mediaPlayers: {
                "text/htm" : 
                    {
                            defaultPlayer: Html5Player
                    },
                "image" :
                    {
                            defaultPlayer: Html5Player
                    },
                "audio": 
                    {
                            defaultPlayer: Html5Player
                    },
                "video" : 
                    {
                            defaultPlayer: Html5Player,
                            //Its possible to choose players for specific file formats
                    },
                "video/x-flv": {defaultPlayer: FlowPlayer},
                "text/css" : undefined,                 //No player - Issue Debbuger.Warning
                "text/html" : 
                    {
                            defaultPlayer: Html5Player
                    },
                "text/plain": 
                    {
                            defaultPlayer: Html5Player
                    },
                "application/x-ginga-NCLua" : undefined,
                "application/x-ginga-NCLet" : undefined,
                "application/x-ginga-settings" : {
                            defaultPlayer: Html5Player
                    },
                "text/xml" : undefined

                },
                
                keyEvents : {}
                
                

	};
	
	this.presentation.bodyDiv = "body" + this.presentation.playerId;
	this.presentation.settingsDiv = "settings" + this.presentation.playerId;
	this.presentation.contextsDiv = "contexts" + this.presentation.playerId;
        
	this.presentation.start = function() {
            if(this.readyToPlay)
		this.context.start();
            else
               this.playRequested = true;
	}
        
	this.presentation.pause = function() {
		this.context.pause();
	}
        
	this.presentation.resume = function() {
		this.context.resume();
	}
        
	this.presentation.abort = function() {
		this.context.abort();
	}
        
	this.presentation.stop = function() {
		this.context.stop();
                this.playRequested = false;
	}
        
        /*
         * Keys mapping declaration
         * They can be redefined by the user
         **/
        
        this.presentation.keys = {
            CURSOR_UP           :	38, 	/* arrow up */
            CURSOR_DOWN         : 	40,		/* arrow down */
            CURSOR_LEFT         :	37,		/* arrow left */
            CURSOR_RIGHT        :	39,		/* arrow right */
            ENTER               :	13,		/* enter */
            RED                 :   81,  	/* q */
            GREEN               :   87,		/* w */
            YELLOW              :   69,		/* e */
            BLUE                :   82,		/* r */
            KEY_0               :   96,		/* 0 */
            KEY_1               :   97,		/* 1 */
            KEY_2               :   98,		/* 2 */
            KEY_3               :   99,		/* 3 */
            KEY_4               :   100,	/* 4 */
            KEY_5               :   101,	/* 5 */
            KEY_6               :   102,	/* 6 */
            KEY_7               :   103,	/* 7 */
            KEY_8               :   104,	/* 8 */
            KEY_9               :   105,	/* 9 */

            BACK                :	90,		/* z */
            EXIT                :	88,		/* x */
            PLAY                :	67,		/* c */
            STOP                :	86,		/* v */
            PAUSE               :	66,		/* b */
            RECORD              :	78,		/* n */

            POWER               :	65,		/* a */
            REWIND              :	83,		/* s */
            EJECT               :	68,		/* d */
            MENU				:   77
        }
        
        //Despite the key codes defined above, an array should be defined
        //with the codes that are going to be processed by the event handler
        //User can redefine this array to avoid player from processing some key events
        this.presentation.keys.allCodes = [13,37,38,39,40,81,87,69,82,96,97,98,99,100,101,102,103,104,105,90,88,67,86,66,78,65,83,68];
	


	/*
        Comentar efeito do ajax!
    */
	
	if (file) {
	
		$.ajax({
			type: "GET",
			url: file,
			dataType: "xml",
			success: $.proxy(function (data) {
				// TODO: checar a sintaxe do arquivo XML
				//Debugger.checkFile(file); ???
				this.execute(data);
			},this)
			// TODO: checar se o arquivo XML foi aberto com sucesso
		});
	
	} else {
	    
		file = document.URL.split('/');
		file = file[file.length-1];
		
		$.ajax({
			type: "GET",
			url: file,
			dataType: "text",
			success: $.proxy(function (data) {
				// TODO: checar a sintaxe do arquivo XML
				this.execute($($.parseXML(data)).find("#"+this.div)[0]);
			},this)
			// TODO: checar se o arquivo XML foi aberto com sucesso
		});
		
	}
	
}