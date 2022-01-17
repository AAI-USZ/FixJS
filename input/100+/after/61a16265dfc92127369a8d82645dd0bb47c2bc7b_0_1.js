function() {
	// only apply this to acronym tags
	
        	$( "#tabs" ).tabs();
//                $( "#button_selectcouleur" ).buttonset().find('label').css('width', '25%');

                // visuelle
                $( "#button_selectcouleur_intensity" ).buttonset().find('label').width(610/4).css("font-size", "100%").css("font-weight", "normal");

                $( "#button_selectcouleur" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");

                $( "#button_selectreflet" ).buttonset().find('label').width(610/6).css("font-size", "100%").css("font-weight", "normal");
                
                // offalctive
                
                $( "#button_selectnez_intensity" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selectnez" ).buttonset().find('label').width(610/9);
                
                // gustative

                $( "#button_selectrondeur" ).buttonset().find('label').width(610/6).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selectacidity" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selectalcool" ).buttonset().find('label').width(610/4).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selecttanin" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selectretro" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");
                $( "#button_selectlongueur" ).buttonset().find('label').width(610/5).css("font-size", "100%").css("font-weight", "normal");

                // final
                $( "#button_selectevolution" ).buttonset().find('label').width(610/6).css("font-size", "100%").css("font-weight", "normal");
                

                
                //change colors of indivdual buttons in buttonsets
                
                //$( "#phil_selectreflet label:first").css("background-color", "blue");
                //$( "#phil_selectreflet label:first").css("background-image", "none");
                
                //$( "#phil_selectreflet"){$("#couleur.tuile").css("background-color", "blue");};

             
}