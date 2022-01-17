function($){
      var defaults = {
    	  success: function(result,settings){
    	      var successMsg = 'Saved &nbsp; <a href="#" id="closerestmsg">'+ settings.closetxt +'</a>'; 
    	      $(settings.msgbox).addClass('msgok').html( successMsg ).show();
    	      $("#closerestmsg").click(function(){$(settings.msgbox).fadeOut("slow");return false;});
    	      return true;
    	  },
    	  callBack: function(result,settings){
    	      if (result.is_error == 1) {
    		  $(settings.msgbox).addClass('msgnok').html(result.error_message);
    		  return false;
    	      }
    	      return settings.success(result,settings);
    	  },
    	  closetxt: "<div class='icon close-icon' title='Close'>[X]</div>",
    	  ajaxURL: '/civicrm/ajax/rest',
    	  msgbox: '#restmsg'
      };

      $.fn.crmAPI = function(entity,action,params,options) {
//    	  params ['fnName'] = "civicrm/"+entity+"/"+action;
    	  params ['entity'] = entity;
    	  params ['action'] = action;
    	  params ['json'] = 1;
    	  var settings = $.extend({}, defaults, options);
    	  $(settings.msgbox).removeClass('msgok').removeClass('msgnok').html("");
    	  $.getJSON(settings.ajaxURL,params,function(result){return settings.callBack(result,settings);});
      };

    $.fn.crmAutocomplete = function (params,options) {
      if (typeof params == 'undefined') params = {};
      if (typeof options == 'undefined') options = {};
      $().extend(params, {
        rowCount:35,
        json:1,
        entity:'Contact',
        action:'quicksearch',
        sequential:1
      });
        //'return':'sort_name,email'

      options = $().extend({}, {
          result: function(data){
               console.log(data);
          return false;
        },
        parse: function (data){
    			     var acd = new Array();
    			     for(cid in data.values){
                 delete data.values[cid]["data"];// to be removed once quicksearch doesn't return data
    				     acd.push({ data:data.values[cid], value:data.values[cid].sort_name, result:data.values[cid].sort_name });
    			     }
    			     return acd;
        },
    	  delay:100,
        minChars:1
        },options
      );
	    var contactUrl = defaults.ajaxURL + "?"+ $.param(params);
	  
	  //    contactUrl = contactUrl + "fnName=civicrm/contact/search&json=1&";
	  //var contactUrl = "/civicrm/ajax/rest?fnName=civicrm/contact/search&json=1&return[sort_name]=1&return[email]&rowCount=25";
	  
	  return this.each(function() {
		  var selector = this;
		  if (typeof $.fn.autocomplete != 'function') 
		      $.fn.autocomplete = cj.fn.autocomplete;//to work around the fubar cj
		      $(this).autocomplete( contactUrl, {
    			  dataType:"json",
    			      extraParams:{name:function () {
    				  return $(selector).val();}
    			  },
    			  formatItem: function(data,i,max,value,term){
              var tmp = [];
              for (attr in data) {
                if (attr != "id")
                 tmp.push(data[attr]);
              }
              return  tmp.join(' :: '); 
    			  },    			
    			  parse: function(data){ return options.parse(data);},
    			  width: 250,
    			  delay:options.delay,
    			  max:25,
    			  minChars:options.minChars,
    			  selectFirst: true
    		 }).result(function(event, data, formatted) {
              options.result(data);       
          });    
       });
     }

}