function(monarch_indicators,N,func,gate){
	if(gate == undefined){gate=true};
	if(gate){
	var monarchs=[];
	var indicators = ['#','.',','];	
	
	if(N==undefined){
		var N=1;
	}
	
	for(var n=0; n<N; n++){
		var monarch_strings = monarch_indicators.split(',');
		for(i=0;i<monarch_strings.length;i++){
			var monarch_string = monarch_strings[i];
			var monarch = {
				id:		Math.random(),
				lord:	this,
				n:n,
				N:N
			}
			var attribute = 'tag';
			for(var j=0;j<monarch_string.length;j++){
				var monarch_char = monarch_string.charAt(j);
				
				if($.inArray(monarch_char),indicators){
					if(monarch.attributes == undefined){
						monarch.attributes={};
					}
					
					switch(monarch_char){
						case '#':
							attribute = 'id';
							monarch.attributes.id=''
							break;
						case '.':
							attribute = 'class';
							if(monarch.attributes.classes == undefined){
								monarch.attributes.classes=[''];
							}else{
								monarch.attributes.classes.push('');
							}
							break;
						case ',':
							monarchs.push(monarch);
							break;
						default:
							switch(attribute){
								case 'id':
									monarch.attributes.id+=monarch_char
									break;
								case 'class':
									monarch.attributes.classes[monarch.attributes.classes.length-1]
										= monarch.attributes.classes[monarch.attributes.classes.length-1]+monarch_char;
									break;
								case 'tag':
									//no attribute given, so its the tag
									if(monarch.tag == undefined){
										monarch.tag = '';
									}
									monarch.tag+=monarch_char;
							}
							break;
					}
				}
			}
			monarchs.push(monarch)
		}
	}
	
		
	for(var i=0;i<monarchs.length;i++){
		var monarch = monarchs[i];
		var selector = null;
		
		var attributes_string='';
		
		for (var monarch_attribute in monarch.attributes){
			switch(monarch_attribute){
				case 'classes':
					attributes_string+=' class="';
					for(var j = 0; j<monarch.attributes.classes.length; j++){
						attributes_string+=' '+monarch.attributes.classes[j];
					}
					attributes_string+='"';
					break;
				case 'id':
					attributes_string+=' id="'+monarch.attributes.id+'"';
					break;
			}
		}
		
		switch(monarch.tag){
			case 'img':
				this.append('<'+monarch.tag+' '+attributes_string+'/>')
				break;
			default:
				this.append('<'+monarch.tag+' '+attributes_string+'></'+monarch.tag+'>')	
				break;	
		}
		
		var monarch_DOM=this.children().last();
		monarch_DOM[0].monarch=monarch_DOM;
		
		//transfer data from monarch to monarch_DOM
		for(key in monarch){
			monarch_DOM.declare(key,monarch[key]);
		}
		
		monarch=monarch_DOM

		if(func != undefined){
			func(monarch);	
		}	
		
	}
	}
	return monarch;
}