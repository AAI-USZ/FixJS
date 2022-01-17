function _setEvents(){
    	
		that.find(".param_value").bind("textchange", function(){
			
			var idx = $(".param_value").index(this);
			var paramName = that.option.paramNames[idx];
			var paramsetVal = _getParamsetVals(paramsetVal);
						
			_replaceTextByParams(paramsetVal);
			 
			function _getParamsetVals(){
				var paramsetVal = {};
				var paramValTexts = that.find(".param_value");
				$(that.option.paramNames).each(function(i,v){
					paramsetVal[v] = $(paramValTexts[i]).val();
				});
				return paramsetVal;
			}
		});

    	that.find(".edit").click(function(){
    		var position = that.position();
    		that.trigger("gotoedit.tplview", $.extend(
    				that.position(), {width: that.width(), height: that.height()}
    			)
    		);
    		that.find('.note').qtip("hide");
    		_remove();
    	});
    	
    	that.find(".ui-dialog-titlebar-close").click(function(){
    		that.find('.note').qtip("hide");
    		_remove();
    	});
    	
		$(that).draggable({
			start: function() {
				console.log("drag start.");
				that.find('.note').qtip("hide");
			}
		});    	
    	
        that.find(".param_set").change(function(e){
        	_onchange(e, this.selectedIndex);
        });
                
        that.find(".paramset_save").click(function(){
        	if(!inputcheck()){
        		return;
        	}
        	that.trigger("paramset_save.tplview", {
        		selectedId : that.find("select.param_set").val(),
        		nid: that.attr("nid")
        	});
        	
        	function inputcheck(){
        		var inputtedSomething = false;
            	that.find(".params").find(".param_value").each(function(i, v){
            		if( $(v).val().trim() !== ""){
            			inputtedSomething = true;
            		}
            	});
            	return inputtedSomething;
        	}
        	
        });
        
        that.find(".paramset_rename").click(function(){
        	var select = that.find("select.param_set");
        	var val = select.val();
        	if( val !== "-1" ){
            	var text = _getTextFromValue(select, val);
        		that.trigger("paramset_rename.tplview", text);
        	}
            
        	function _getTextFromValue(select, val){
        		var ret;
        		select.find("option").each(function(i, option){
        			if($(option).attr("value") === val){
        				ret = $(option).text();
        			}
        		});
        		return ret;
        	}
        	
        });
        
        that.find(".paramset_remove").click(function(){
        	var select = that.find("select.param_set");
        	var val = parseInt(select.val());
        	if( val !== -1 ){
        		that.trigger("paramset_remove.tplview", val);
        		
            	that.option.removeParamset({
            		nid: that.attr("nid"), paramsetid: val
            	}, function(callback){
            		var activeParamsetIdx = _getactiveParamsetIdx(that.option.paramset, val);
            		that.option.paramset.splice(activeParamsetIdx, 1);
            		select.find("option").eq(activeParamsetIdx).remove();
            		that.activeParamsetIdx = -1;
            		select.val("-1");
            		_onchange(null, 0);
            	});
        		
        	}

        });
    }