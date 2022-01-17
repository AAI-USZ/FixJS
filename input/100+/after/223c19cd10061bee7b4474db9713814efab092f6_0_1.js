function () {

        if(window.location.hash === "#overview" && $("#modalBackground").is(":visible")){

            $("#modalBackground").fadeOut("fast");

            $("#speciesPanel").fadeOut("fast");

            setTimeout(function(){

                $("#modalBackground").remove();

                $("#speciesPanel").remove();

            },200);

        }

        else if(_currentSelection !== window.location.hash && window.location.hash !== "#overview" && $("#modalBackground").is(":visible")){

            var order;

            if ($("#imgLinkOdd").length > 0){

                order = "Odd";

            }

            else{

                order = "Even";

            }

            dojo.forEach(_points.graphics,function(g){

            	if("#"+g.attributes.TaxonID === window.location.hash){

                    $("#imgLink"+order).fadeOut("fast");

                    $("#commonName"+order).fadeOut("fast");

                    $("#imgLink"+order).fadeOut("fast");

                    $("#sciName"+order).fadeOut("fast");

                    $("#statusText"+order).fadeOut("fast");

                    $("#speciesDescription"+order).fadeOut("fast");

                    $("#nextArrow"+order).fadeOut("fast");

                    $("#prevArrow"+order).fadeOut("fast");

                    $("#moreInfo"+order).fadeOut("fast");

                    setTimeout(function() {

                        $("#imgLink"+order).remove();

                        $("#commonName"+order).remove();

                        $("#imgLink"+order).remove();

                        $("#sciName"+order).remove();

                        $("#statusText"+order).remove();

                        $("#speciesDescription"+order).remove();

                        $("#nextArrow"+order).remove();

                        $("#prevArrow"+order).remove();

                        $("#moreInfo"+order).remove();

                    }, 200);

                    _speciesMap.firstLoad = false;

                    _outlineLayer.setDefinitionExpression("TaxonID='"+g.attributes.TaxonID+"'");

                    _fillLayer.setDefinitionExpression("TaxonID='"+g.attributes.TaxonID+"'");

        			openPopout(g.attributes,false);

        		}

        	});

        }

        else {

            if (window.location.hash !== _currentSelection){

                window.history.back();

            }

        }

    }