function(){

    		 

    	//static

    	var FB;

    	

     	var constructor; 

     	//singleton ...?

     	

     	if(constructor) return constructor;

     	

     	constructor = function(fb,modules){

     		FB = fb;

     		var _self = this;

     		var _modules = modules.split(',');

     		

     		smp.events.extend(this);

     		

     		var i,length = _modules.length;

     		for(i=0; i<length; i++){

     			FcbkApi.modules[_modules[i]](this);

     		}



     	};

     	

     	constructor.prototype = {

     		user_data : {id:undefined, name:'', photo:''},

     		getProfileUrl:function(id){

     			return "https://graph.facebook.com/"+id+"/picture";

     		}

     	}

     	

  		return constructor;

      	

      }