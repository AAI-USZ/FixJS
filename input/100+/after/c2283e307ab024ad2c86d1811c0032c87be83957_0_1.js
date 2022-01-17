function initIdentifiersSEEALSO(){
		var key_value=$('#key').text();
		//SEE ALSO FOR IDENTIFIERS
        var identifiers = [];
        $.each($('#identifiers p'), function(){//find in every identifiers
        	var ident = $(this).html();
        	if(ident.indexOf('nla.party-')>=0){
        		if(ident.indexOf('http://')==0){
        			//is a link
        			$('#endlink').prepend('<a href="'+ident+'">View the record for this Party in Trove</a><br/>');
        		}else{
					//is not a link
					$('#endlink').prepend('<a href="http://'+ident+'">View the record for this Party in Trove</a><br/>');
        		}
        	}
        	//identifiers.push($(this).html());
        });

        $.each($('#identifiers a'), function(){//find in every identifiers
        	identifiers.push($(this).text());
        });
    
        $.each($('.descriptions p'), function(){//find in every descriptions that contains the identifier some where for NLA parties
        	if($(this).html().indexOf('nla.party-') > 0){
        		var foundit = $(this).html();
        		var words = foundit.split(' ');
        		$.each(words, function(i, word){
        			if(word.indexOf('nla.party-')>=0){
        				identifiers.push(word);
        			}
        		});
        	}
        });
        
        $.each($('.descriptions p'), function(){//find in every descriptions that contains the identifier some where NHMRC and ARC
        	if($(this).html().indexOf('http://purl.org/au') > 0){
        		var foundit = $(this).html();
        		var words = foundit.split(' ');
        		$.each(words, function(i, word){
        			if(word.indexOf('http://purl.org/au')>=0){
        				identifiers.push(word);
        			}
        		});
        	}
        });

        console.log(identifiers);
        if (identifiers.length > 0){
	        var identifierSearchString = '+fulltext:(';
	        var first = true;
	        $(identifiers).each(function(){
	        	if(first){
	        		identifierSearchString +='"'+this+'"';
	        		first = false;
	        	}else{
	        		identifierSearchString += ' OR "'+this+'"';
	        	}
	        });
	        identifierSearchString +=')';
	        //console.log(identifierSearchString);
	        identifierSearchString = encodeURIComponent(identifierSearchString);
	        
	        var relatedClass = $('#class').html();
	        
	        $.ajax({
	            type:"POST",
	            url: base_url+"search/seeAlso/count/identifiers"+relatedClass,
	            data:"q=*:*&classFilter=party;activity&typeFilter=All&groupFilter=All&subjectFilter=All&licenceFilter=All&page=1&spatial_included_ids=&temporal=All&excluded_key="+key_value+'&extended='+identifierSearchString,
	                    success:function(msg){
	                    	//console.log(msg);
	                            $("#seeAlso-IdentifierBox").html(msg);
	                            if(parseInt($('#seealso-realnumfound').html())==0){
	                            	$('#seeAlso-Identifier').hide();
	                            }
	                    },
	                    error:function(msg){
	                            //console.log("error" + msg);
	                    }
	        });
	        var seeAlsoPage = 1;
	        $('#seeAlso_identifierNumFound').live('click', function(){
		        $.ajax({
	                type:"POST",
	                url: base_url+"search/seeAlso/content/identifiers",
	                data:"q=*:*&classFilter=party;activity&typeFilter=All&groupFilter=All&subjectFilter=All&licenceFilter=All&page=1&spatial_included_ids=&temporal=All&excluded_key="+key_value+'&extended='+identifierSearchString,
	                    success:function(msg){
	                            $("#infoBox").html(msg);
	                            $(".accordion").accordion({autoHeight:false, collapsible:true,active:false});
	                            $("#infoBox").dialog({
	                                    modal: true, minWidth:700,maxHeight:300,draggable:false,resizable:false,
	                            		title:"ANDS Suggested Links",
	                                    buttons: {
	                                        '<': function() {
	                                                if(seeAlsoPage > 1){
	                                                        seeAlsoPage = seeAlsoPage - 1;
	                                                        $('.accordion').html('Loading...');
	                                                        getSeeAlsoAjax(group_value, subjectSearchstr, seeAlsoPage, key_value)
	                                                }
	                                        },
	                                        '>': function() {
	                                                if(seeAlsoPage < parseInt($('#seeAlsoTotalPage').html())){
	                                                        seeAlsoPage = seeAlsoPage + 1;
	                                                        $('.accordion').html('Loading...');
	                                                        getSeeAlsoAjax(group_value, subjectSearchstr, seeAlsoPage, key_value)
	                                                }
	                                        }
	                                    },
	                                    open: function(){
	                                        $(".ui-dialog-buttonset").append("<span id='status'></span>");
	                                        setupSeealsoBtns();
	                                    }
	                            }).height('auto');
	                    },
	                    error:function(msg){
	                            //console.log("error" + msg);
	                    }
		         });
	        });
        }else{
        	$('#seeAlso-Identifier').hide();
        }
	}