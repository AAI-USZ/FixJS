function(elem, val){
		
		if( !elem.getAttribute('data-dependent-validation') ){return;}
		
		var data = $(elem).data('dependentValidation');
		var specialVal;
		if(!data){return;}
		var depFn = function(e){
			var val = $.prop(data.masterElement, data["from-prop"]);
			if(specialVal){
				val = $.inArray(val, specialVal) !== -1;
			}
			if(data.toggle){
				val = !val;
			}
			$.prop( elem, data.prop, val);
		};
		
		if(!data._init || !data.masterElement){
			
			if(typeof data == 'string'){
				data = {"from": data};
			}
			
			
			data.masterElement = document.getElementById(data["from"]) || (document.getElementsByName(data["from"] || [])[0]);
			
			if (!data.masterElement || !data.masterElement.form) {return;}
			
			if(/radio|checkbox/i.test(data.masterElement.type)){
				if(!data["from-prop"]){
					data["from-prop"] = 'checked';
				}
				if(!data.prop && data["from-prop"] == 'checked'){
					data.prop = 'disabled';
				}
			} else if(!data["from-prop"]){
				data["from-prop"] = 'value';
			}
			
			if(data["from-prop"].indexOf('value:') === 0){
				specialVal = data["from-prop"].replace('value:', '').split('||');
				data["from-prop"] = 'value';
				
			}
			
			data = $.data(elem, 'dependentValidation', $.extend({_init: true}, dependentDefaults, data));
			console.log($(data.masterElement.type === 'radio' && getGroupElements(data.masterElement) || data.masterElement))
			if(data.prop !== "value" || specialVal){
				$(data.masterElement.type === 'radio' && getGroupElements(data.masterElement) || data.masterElement).bind('change', depFn);
			} else {
				$(data.masterElement).bind('change', function(){
					$.webshims.refreshCustomValidityRules(elem);
				});
			}
		}

		if(data.prop == "value" && !specialVal){
			return ($.prop(data.masterElement, 'value') != val);
		} else {
			depFn();
			return '';
		}
		
	}