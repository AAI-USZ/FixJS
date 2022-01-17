function(json) {	    			  			
	    			    			
	    			var procedures_params = {};
	    			
	    			var mappings = self._doNames2IdMapping(json.response);
	    			var procedureName2IdKey = mappings[0];
	    			var parameterName2IdKey = mappings[1];
	    			
	    			var facets = json.facet_counts['facet_fields']['proc_param_name'];    	
	    	    	
	        		for ( var i=0; i<facets.length; ){	        			
	        			var names = facets[i].split('___');
	        			var procedure_name = names[0];
	        			var parameter_name = names[1];
	        			var count = facets[i+1];
	        			
	        			if ( !procedures_params[procedure_name] ){	        				
	        				procedures_params[procedure_name] = [];
	        			}	
	        			procedures_params[procedure_name].push({param_name : parameter_name,
	        													param_count: count}); 
	        			i+=2;
	        		}	
	        		
	        		var table = $("<table id='pipeline'><caption>IMPC</caption></table>");
	        		//console.log(procedures_params);
	        		var counter=0;
	        		for ( var i in procedures_params){
	        			counter++;
	        			var procedureCount = procedures_params[i].length;
	        			var pClass = 'procedure'+counter;
	        			var tr = $('<tr></tr>');
	        			var td1 = $('<td></td>').attr({'class': pClass});
	        			var td2 = $('<td></td>');	        			        			
	        			var a = $('<a></a>').attr({'class':'paramCount', 'rel': procedureName2IdKey[i].stable_id}).text(procedureCount);
	        			table.append(tr.append(td1.text(i), td2.append(a)));
	        			
	        			for ( var j=0; j<procedures_params[i].length; j++ ){
	        				var pmClass = pClass+'_param';
	        				var tr = $('<tr></tr>').attr('class', pmClass);
	        				var oParamCount = procedures_params[i][j];
	        				//console.log('Param: '+ oParamCount.param_name + ':'+ oParamCount.count);
	        				var a = $('<a></a>').attr({
	        					href: 'http://www.mousephenotype.org/impress/impress/listParameters/'	        						
	        						+ procedureName2IdKey[i].stable_key,	        					
	        					target: '_blank'
	        				}).text(oParamCount.param_name);	
	        				
	        				var td = $('<td></td>').attr({colspan: 2, rel: parameterName2IdKey[oParamCount.param_name].stable_key});
	        				table.append(tr.append(td.append(a)));	        				
	        			}	        			
	        		}

	        		$('div#pipelineFacet .facetCount').text(json.response.numFound);
	        		if (json.response.numFound == 0 ){
	        			table = null;
	        		}	    			
	        		$('div#pipelineFacet .facetCatList').html(table);

					var regex = /procedure\d+/;
	        		$('table#pipeline td[class^=procedure]').toggle(
	        			function(){ 
	        				var match = regex.exec( $(this).attr('class') );
	        				var thisClass = match[0] ? match[0] : $(this).attr('class');	        				
	        				$(this).parent().siblings("tr." + thisClass + '_param').show();
	        			},
	        			function(){
	        				var match = regex.exec( $(this).attr('class') );
	        				var thisClass = match[0] ? match[0] : $(this).attr('class');	        				
	        				$(this).parent().siblings("tr." + thisClass + "_param").hide();
	        			}
	        		);
	        		$('table#pipeline td a.paramCount').click(function(){	
	        			$('table#pipeline td[class^=procedure]').removeClass('highlight');
	        			$(this).parent().siblings('td[class^=procedure]').addClass('highlight');
	        			var proc_stable_id = $(this).attr('rel');   
	                    var solrSrchParams = self.options.facetId2SearchType.pipelineFacet.params;	                   
	                    solrSrchParams.q = self.options.data.queryString;
	                    solrSrchParams.fq = 'procedure_stable_id:' + proc_stable_id;	                  
	                    $(self.options.geneGridElem).trigger('search', [{type: 'parameter', solrParams: solrSrchParams }]);
	        		});	        		
	    		}