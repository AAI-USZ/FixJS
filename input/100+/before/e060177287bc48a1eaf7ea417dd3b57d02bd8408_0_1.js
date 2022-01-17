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
	this.htmlPlayer = "#" + this.presentation.getDivId(node.id);
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
		// Cria o fundo da mídia
		$(this.region).append("<div class='playerBkg' id='" + this.presentation.getDivId(node.id,"bkg") + "'></div>");
		// Cria a mídia
		switch (this.type.split("/")[0]) {
			case "video": {
				// type = video/*
				$(this.htmlPlayerBkg).append("<video class='player' poster='images/loading.gif' id='" + this.presentation.getDivId(node.id) + "'></video>");	
				break;
			}
			case "audio": {
				// type = audio/*
				$(this.htmlPlayerBkg).append("<audio class='player' id='" + this.presentation.getDivId(node.id) + "'></audio>");
				break;
			}
			case "image": {
				// type = image/*
				$(this.htmlPlayerBkg).append("<img class='player' id='" + this.presentation.getDivId(node.id) + "'></img>");
				break;
			}
			case "application": {
				switch (this.type) {
					case "application/x-ginga-settings": {
						// type = application/x-ginga-settings
						$(this.htmlPlayerBkg).append("<div class='player' id='" + this.presentation.getDivId(node.id) + "'></div>");
						break;
					}
					case "application/x-ginga-NCLua": {
						// type = application/x-ginga-NCLua
						Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[this.type]);
						break;
					}
					case "application/x-ginga-NCLet": {
						// type = application/x-ginga-NCLet
						Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[this.type]);
						break;
					}
					case "application/x-ginga-time": {
						// type = application/x-ginga-time
						Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[this.type]);
						break;
					}
				}
				break;
			}
			case "text": {
				switch (this.type) {
					case "text/plain":
					case "text/html": {
						// type = text/plain, text/html
						$(this.htmlPlayerBkg).append("<div class='player' id='" + this.presentation.getDivId(node.id) + "'></div>");
						break;
					}
					case "text/css": {
						// type = text/css
						Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[this.type]);
						break;
					}
					case "text/xml": {
						// type = text/xml
						Debugger.warning(Debugger.WARN_NOT_IMPLEMENTED_YET,"media",[this.type]);
						break;
					}
				}
				break;
			}
		}
		$(this.htmlPlayerBkg).css("display","none");
		this.load(node.src);

		//Tenta criar o popCorn player de acordo com o tipo d emedia
		if (this.checkType(["video","audio"]))
		{
			do {	
					//this.popcornPlayer = new Popcorn(this.htmlPlayer, { frameAnimation: true });
					this.popcornPlayer = new Popcorn(this.htmlPlayer);	
			} while (!this.popcornPlayer);
		} else if(this.checkType(["image","text"])){
			do {	
					Popcorn.player("baseplayer");
					this.popcornPlayer = new Popcorn.baseplayer(this.htmlPlayer);
					
			} while (!this.popcornPlayer);
		} 
		//Caso um popcornPlayer tenta sido criado (media do tipo video, audio,image ou text)
		// 'equivale' a trocar this.popcornPlayer por this.checkType(["video","audio","image","text"])
		// sendo o usado o mais eficiente
		if(this.checkType(["video","audio","image","text"]))
		{
			$(this.htmlPlayer).on("ended",$.proxy(function() {
				this.stop();
			},this));
			for (i in this.area) {
				if (this.area[i].end) {
					eval("this.popcornPlayer.exec(this.area[i].endTime,$.proxy(function() {"+
						"if (this.area['"+i+"'].started) {"+
							"this.area['"+i+"'].started = false;"+
							"$(this.htmlPlayer).trigger('stop',[this.area['"+i+"'].id]);"+
						"} else {"+
						"$(this.htmlPlayer).trigger('presentation.onEnd',[this.area['"+i+"'].id]); "+
						"}" +
					"},this));");
				}				
				if (this.area[i].begin) {
					eval("this.popcornPlayer.exec(this.area[i].beginTime,$.proxy(function() {"+
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
		this.setProperty(node.property[i].name,node.property[i].value);
	}
	
	// Tratamento do explicitDur
	if(this.explicitDur)
	{
		this.popcornPlayer.exec(this.explicitDur,$.proxy(function() {
			this.stop();
		},this));
	}
	
	// Faz o bind dos eventos
	this.bindEvents();
	// Salva o player no elemento HTML via JQuery
	$(this.htmlPlayer).data("player",this);
}