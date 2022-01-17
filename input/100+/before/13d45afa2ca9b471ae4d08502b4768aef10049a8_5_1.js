function (node) {
	// Cria as transições
	if (node.descriptor) {
		this.transIn = node.descriptor.transIn;
		this.transOut = node.descriptor.transOut;
		
		//Seta o valor de expliticDur
		if (node.descriptor.explicitDur) {
			vector = node.descriptor.explicitDur.split("s");
			this.explicitDur = vector[0];
		}
	}
	
	// Cria as áreas
	for (i in node.area) {
		this.area[node.area[i].id] = node.area[i];
		if (node.area[i].begin) {
			this.area[node.area[i].id].beginTime = parseInt(node.area[i].begin.split('s')[0]);
		}
		if (node.area[i].end) {
			this.area[node.area[i].id].endTime = parseInt(node.area[i].end.split('s')[0]);
            this.area[node.area[i].id].started = false;
		}
	}
	// Verifica o tipo da mídia
	if (node.type) {
		this.type = node.type;
	} else {
		var buffer = node.src.split(".");
		this.type = this.mediaTypes[buffer[buffer.length-1]];
	}
	// Cria os IDs (região e mídia)
	this.htmlPlayer = "#" + this.divId;
	this.htmlPlayerBkg = "#" + this.presentation.getDivId(node.id,"bkg");
	if (this.checkType(["application"])) {
		this.region = "#" + this.presentation.settingsDiv;
	} else {
		this.region = "#" + this.presentation.playerDiv;
	}
	

	
	
	// ----- REFER -----	
	if (node.refer && (node.instance!="new")) {
		return;
	} else {
	// -----------------
		// Creates media background div
		$(this.region).append("<div class='playerBkg' id='" + this.presentation.getDivId(node.id,"bkg") + "'></div>");
		
                // Creates media player
                var mediaPlayers = this.presentation.mediaPlayers;
                
                if(mediaPlayers[this.type])
                    {
                        //creates the playerSettings data structure
                        this.playerSettings = 
                        {
                             source: 
                                {
                                    type: this.type,
                                    ext: node._ext,
                                    url: this.presentation.path + node.src
                                },


                                id : this.divId,
                                parentId: this.presentation.getDivId(node.id,"bkg"),

                                createElement: $.proxy(this.createElement,this),
                                checkType: $.proxy(this.checkType,this),
                                
                              media:{
                                areas: this.area  
                              }
                                


                        }
                       
                        
                        var playerClass = mediaPlayers[this.type][node._ext] || mediaPlayers[this.type].defaultPlayer;
                        if(playerClass)
                            {
                                this.player = new playerClass(this.playerSettings);
                                this.playerName = playerClass.name;
                            }
                        else
                            {
                                Debugger.error(Debugger.ERR_MEDIAPLAYER_NOPLAYER,this.type,['no defaultPlayer or extension player']);
                                this.player = {};
                            }
                    }
                else
                    {
                        Debugger.error(Debugger.ERR_MEDIAPLAYER_NOPLAYER,this.type);
                        this.player = {};
                    }
                
		
		$(this.htmlPlayerBkg).css("display","none");
                
                //presetup (construtor)
		this.load(node.src);
                //possetup( needed ?? )
                
                
                this.player.onEnded = $.proxy(function() {
                        this.stop();
                },this);
                
                //if player supports area
                if(this.player.exec)
                {
                    for (i in this.area) {
                            if (this.area[i].end) {
                                    eval("this.player.exec(this.area[i].endTime,$.proxy(function() {"+
                                            "if (this.area['"+i+"'].started) {"+
                                                    "this.area['"+i+"'].started = false;"+
                                                    "$(this.htmlPlayer).trigger('stop',[this.area['"+i+"'].id]);"+
                                            "} else {"+
                                            "$(this.htmlPlayer).trigger('presentation.onEnd',[this.area['"+i+"'].id]); "+
                                            "}" +
                                    "},this));");
                            }				
                            if (this.area[i].begin) {
                                    eval("this.player.exec(this.area[i].beginTime,$.proxy(function() {"+
                                            "$(this.htmlPlayer).trigger('presentation.onBegin',[this.area['"+i+"'].id]);"+
                                    "},this));");
                            }
                            // TODO: area definida por frames ao invés de tempo
                    }
                 }


	
	// ---- REFER ----
	}
	// ---------------

	// Cria as propriedades
	$(this.htmlPlayer).data("property",[]);
	if (node.descriptor) {
		if (node.descriptor.region) {
			// Propriedades da tag <region> (atributos)
			this.setProperty("zIndex",node.descriptor.region.zIndex);
			this.setProperty("width",node.descriptor.region.width);
			this.setProperty("height",node.descriptor.region.height);
			this.setProperty("bottom",node.descriptor.region.bottom);
			this.setProperty("top",node.descriptor.region.top);
			this.setProperty("right",node.descriptor.region.right);
			this.setProperty("left",node.descriptor.region.left);
			this.setProperty("title",node.descriptor.region.title);
		}
		for (i in node.descriptor.descriptorParam) {
			// Propriedades da tag <descriptor> (descriptorParam)
			this.setProperty(node.descriptor.descriptorParam[i].name,node.descriptor.descriptorParam[i].value);
		}
	}
	for (i in node.property) {
		// Propriedades da tag <media> (property)
		var name = node.property[i].name;
		var value = node.property[i].value;
		if(value){
                        // Aqui, se a propriedade for de tamanho, deve ocorrer um tratamento específico, para o caso de o valor ser em porcentagem.
			// Isto se deve ao fato que o "setProperty" trata valores com porcentagem de uma forma que não é a que desejamos neste caso. 
			// Por isso, ao final deste bloco de código, "setProperty" é chamado com valores absolutos.
			if(name == "width" || name == "height"){
				value = this.__fixPercentageSize(name, value);
			}
			else if(name == "bounds")
			{
				var bounds = value.split(",");
				bounds[2] = this.__fixPercentageSize("width",bounds[2]);
				bounds[3] = this.__fixPercentageSize("height",bounds[3]);
				value = bounds.join();
			}
			this.setProperty(name,value);
		}
	}
	
	// explicitDur treatment
	if(this.explicitDur)
	{
                //explicitDur will not work unless player implements exec
		if(this.player.exec)
                    this.player.exec(this.explicitDur,$.proxy(function() {
                         this.stop();
                    },this));
	}
	
	// Bind events
	this.bindEvents();
	// Saves the media player using jQuery data function
	$(this.htmlPlayer).data("player",this);
}