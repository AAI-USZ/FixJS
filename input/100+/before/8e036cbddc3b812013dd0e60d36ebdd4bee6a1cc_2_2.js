function($, window, document, undefined){
	"use strict";
	var addCustomValidityRule = $.webshims.addCustomValidityRule;
	addCustomValidityRule('partialPattern', function(elem, val){
		if(!val || !elem.getAttribute('data-partial-pattern')){return;}
		var pattern = $(elem).data('partial-pattern');
		if(!pattern){return;}
		return !(new RegExp('(' + pattern + ')', 'i').test(val));
	}, 'This format is not allowed here.');
	
	addCustomValidityRule('tooShort', function(elem, val){
		if(!val || !elem.getAttribute('data-minlength')){return;}
		return $(elem).data('minlength') > val.length;
	}, 'Entered value is too short.');
	
	var groupTimer = {};
	addCustomValidityRule('group-required', function(elem, val){
		var name = elem.name;
		if(!name || elem.type !== 'checkbox' || !$(elem).hasClass('group-required')){return;}
		var checkboxes = $( (elem.form && elem.form[name]) || document.getElementsByName(name));
		var isValid = checkboxes.filter(':checked');
		if(groupTimer[name]){
			clearTimeout(groupTimer[name]);
		}
		groupTimer[name] = setTimeout(function(){
			checkboxes
				.unbind('click.groupRequired')
				.bind('click.groupRequired', function(){
					checkboxes.filter('.group-required').each(function(){
						$.webshims.refreshCustomValidityRules(this);
					});
				})
			;
		}, 9);
		
		return !(isValid[0]);
	}, 'Please check one of these checkboxes.');
	
	//based on jörn zaefferes validiation plugin
	// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
	// based on http://en.wikipedia.org/wiki/Luhn
	var dashDigit = /[^0-9-]+/;
	addCustomValidityRule('creditcard', function(elem, value){
		if(!value || !$(elem).hasClass('creditcard-input')){return;}
		if (!dashDigit.test(value)){				
			return true;
		}
		var nCheck = 0,
			nDigit = 0,
			bEven = false;

		value = value.replace(/\D/g, "");

		for (n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n);
			nDigit = parseInt(cDigit, 10);
			if (bEven && (nDigit *= 2) > 9) {
				nDigit -= 9;
			}
			nCheck += nDigit;
			bEven = !bEven;
		}

		return (nCheck % 10) !== 0;
	}, 'Please enter a valid credit card number');
	
	var dependentDefaults = {
		//"from": "IDREF || UniqueNAMEREF", //required property: element 
		"prop": "value", //default: value||disabled	(last if "from-prop" is checked)
		"from-prop": "value", //default: value||checked (last if element checkbox or radio)
		"toggle": false
	};
	
	var getGroupElements = $.webshims.modules && $.webshims.modules["form-core"].getGroupElements || function(elem) {
		return $(elem.form[elem.name]).filter('[type="radio"]');
	};
	
	addCustomValidityRule('dependent', function(elem, val){
		
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

			if(data.prop !== "value" || specialVal){
				$(data.masterElement.type === 'radio' && getGroupElements(data.masterElement) || data.masterElement).bind('change', depFn);
			} else {
				$(data.masterElement).bind('change', function(){
					$.webshims.refreshCustomValidityRules(elem);
					if($(elem).is('.form-ui-invalid, .form-ui-valid')){
						$(elem).trigger('refreshvalidityui');
					}
				});
			}
		}

		if(data.prop == "value" && !specialVal){
			return ($.prop(data.masterElement, 'value') != val);
		} else {
			depFn();
			return '';
		}
		
	}, 'The value of this field does not repeat the value of the other field');
}