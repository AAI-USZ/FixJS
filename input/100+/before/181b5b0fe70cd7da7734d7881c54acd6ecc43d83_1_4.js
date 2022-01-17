function(method){
    var that = this;
    
    this.saveParamset = function(paramsetName){

    	var paramVals = _getParamVals();
    	
    	var paramset = { vals: {}};
    	if( paramsetName ){
    		paramset.name = paramsetName;
    	}else{
    		var select = that.find("select.param_set");
    		var selectedVal = select.val();
    		paramset.id = parseInt(selectedVal);
    		select.find("option").each(function(i,v){
    			if($(v).attr("value") === selectedVal){
    				paramset.name = $(v).text();
    			}
    		});
    	}
    	
    	var paramNames = that.option.paramNames;
    	jQuery(paramNames).each(function(i, v){
    		paramset.vals[v] = paramVals[i];
    	});
    	
    	that.option.saveParamset({ nid: that.attr("nid"), paramset: paramset });
    	
    	function _getParamVals(){
    		var vals = [];
        	that.find(".params").find(".param_value").each(function(i, v){
        		vals.push($(v).val().trim());
        	});
        	return vals;
    	}
    };
    
    
    this.renameParamset = function(paramsetName){
    	var selectedVal = that.find("select.param_set").val();
    	that.option.renameParamset({
    		nid: that.attr("nid"),
    		paramsetid: selectedVal, paramsetName: paramsetName
    	}, function(){
    		//update option
    		$("select.param_set option").each(function(i, v){
    			if($(v).attr("value") === selectedVal){
    				$(v).text(paramsetName);
    			}
    		});
    	});
    };
    
    this.addParamset = function(paramsetid, paramsetName){
    	var paramset = that.option.paramset;
    	var paramNames = that.option.paramNames;
    	
    	//0番目の空白オプションの値を変更
    	var firstOption = that.find("select.param_set option").eq(0);
    	firstOption.attr({ value: paramsetid }).text(paramsetName);
    	
    	//現在のテキストを保管
    	var paramTexts = that.find(".params .param_value");
        $(paramNames).each(function(i, v){
        	paramset[0].id = paramsetid;
        	paramset[0].name = paramsetName;
        	paramset[0].vals[v] = $(paramTexts[i]).val();
        });
        
        //空要素を追加
    	paramset.unshift({id: "-1" ,name: "", vals: {}});
    	var select = that.find("select.param_set");
    	select.append($("<option>").attr({ value: "-1" }).text(""));
    	
    	//ソート
    	paramset = _sortParamset();
    	
    	//paramsetを元にselectを再生成
 		var activeParamsetIdx = _getactiveParamsetIdx(paramset, paramsetid);
		_createSelect(paramset, activeParamsetIdx);
		
		that.activeParamsetIdx = activeParamsetIdx;

    }
        
    var methods = {
    		init : init,
    		saveParamset : this.saveParamset,
    		addParamset: this.addParamset,
    		renameParamset: this.renameParamset
    }
    
	if( methods[method] ){
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1));
	}else if( typeof method === 'object' || !method ){
		return methods.init.apply( this, arguments );
	}else{
		jQuery.error( 'Method ' + method+ ' does not exist.' );
	}
    
    function init(option){
    	var defaultOption = {
    		title : "",
    		text : "",
    		note : "",
    		paramNames : [],
    		paramset: [],
    		activeParamSetId : -1,
    		onsaveParamset : function(){}
    	};
    	that.option = $.extend(defaultOption, option);
    	
    	this.attr("nid", option.nid);

        that.resizable();
        that.find(".text").resizable();
        
        _setButtons();
        _setTextValues();
        _createNote();
        _createParamArea();
        
    	_setLayout();
        
        _setEvents();
                
        return that;
    }
    

    
    function _setLayout(){
    	var option = that.option;
        if(option.width){
        	if(that.width() < option.width){
        		that.css("width", option.width);
        	}
        }
        if(option.height){
        	if(that.height() < option.height){
        		that.css("height", option.height);
        	}
        }
        
        that.css("min-height", that.height());
        that.css("position", "absolute");
        if(option.left){
        	that.css("left", option.left);
        }
        if(option.top){
        	that.css("top", option.top);
        }
    }

    function _setButtons(){
        that.find(".ui_button").button();
        that.find(".ui-dialog-titlebar-close").hover(function(){
        	$(this).addClass("ui-state-hover");
        }, function(){
        	$(this).removeClass("ui-state-hover");
        });
    }
    
    function _setTextValues(){
        if(that.option.title){
            that.find(".header span.ui-dialog-title").text(that.option.title);
        }
        if(that.option.text){
            that.find(".text").text(that.option.text);
        }
    }
    
    function _sortParamset(){
    	var paramset = that.option.paramset;
		paramset.sort(function(a, b){
			return a.name > b.name ? 1 : -1;
		});
		return paramset;
    }
    
    function _createParamArea(){
		var paramNames = that.option.paramNames;

		var activeParamSetId = that.option.activeParamSetId;
    	if(paramNames.length > 0){

    		var paramset = _sortParamset();
    		paramset.unshift({id: "-1" ,name: "", vals: {}});	//add empty set

    		var activeParamsetIdx = _getactiveParamsetIdx(paramset, activeParamSetId);

    		_createSelect(paramset, activeParamsetIdx);
    		
    		var activeParamset = paramset[activeParamsetIdx];
    		_createParamRows(paramNames, activeParamset.vals);
    		
    		that.activeParamsetIdx = activeParamsetIdx;

    		that.find(".param_area").show();
    	}
    	
    	function _createParamRows(paramNames, paramVals){
    		var tmplParams = [];
            $(paramNames).each(function(i, v){
            	var val = paramVals[v] ? paramVals[v] : "";
            	tmplParams.push({ name: v, val: val });
            });
    		that.find("ul.params").append($("#tplview-param-li").tmpl(tmplParams));
    	}

    }
    
	function _createSelect(paramset, activeParamsetIdx){
		var select  = that.find(".param_set");
		select.empty();
		var selectVal = "-1";
        $(paramset).each(function(i, v){
        	select.append($("<option>").attr({value: v.id }).text(v.name));
            if( i === activeParamsetIdx ){
                selectVal = v.id;
            }
        });
        select.val(selectVal);
	}       
    
	function _getactiveParamsetIdx(paramset, activeid){
		var retIdx = 0;
		$(paramset).each(function(i, v){
			if(v.id === activeid){
				retIdx = i;
			}
		});
		return retIdx;
	}
    
    function _remove(){
		that.remove();
		that.trigger("removed.tplview");
    }
    
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
    
    
    function _onchange(e, selectedIdx){
    	console.log("change");
    	
    	var paramNames = that.option.paramNames;
        var paramTexts = that.find(".params .param_value");

        //変更前の値を格納
        if(that.activeParamsetIdx !== -1){
            $(paramNames).each(function(i, v){
            	that.option.paramset[that.activeParamsetIdx].vals[v] = $(paramTexts[i]).val();
            });
        }

        that.activeParamsetIdx = selectedIdx;	//現在選択しているインデックスを新しいものに変更
        var activeParamset = that.option.paramset[that.activeParamsetIdx];
        
        $(paramNames).each(function(i, v){
        	var val =  activeParamset.vals[v] || "";
        	$(paramTexts[i]).val(val);
        });
        
        _replaceTextByParams(activeParamset.vals);
        
    }
    
    function _replaceTextByParams(paramVals){
    	var text = that.option.text;
    	var empty = _checkAllValuesAreEmpty(paramVals);
    	if(empty){
    		that.find(".text").text(text);
    	}else{
            var textEdited = text.toString();
            $.each(paramVals, function(key, val){
            	if(val.trim() !== ""){
            		textEdited = textEdited.replace(new RegExp('__' + key + '__', 'g'), val);
            	}
            });
            that.find(".text").text(textEdited);
    	}

        function _checkAllValuesAreEmpty(paramvals){
        	var b = true;
        	$.each(paramvals, function(k,v){
        		if(v.trim() !== ""){
        			b = false;
        		}
        	});
        	return b;
        }
    }
    
    
    function _createNote(){
        that.find('.note').qtip({
           content: that.option.note,
           show: 'click',
           hide: 'click',
           position: {
              corner: {
                 target: 'rightMiddle',
                 tooltip: 'leftTop'
              }
           },
            style: { 
                name: 'blue',
                left: 50,
                tip: {
                    corner: "leftTop",
                    color: "#ADD9ED",
                    size: {x: 30, y:8},
                },
                border: {
                      width: 2,
                      radius: 4,
                      color: '#ADD9ED'
                   },        
              'font-size': 12
            }
        });        
    }
        
    
}