function(){
    
    $('#id_producto_no_maderable').change(function(){	
    		if (($("#id_producto_no_maderable").val()) == 1) {
    			$('.field-tipo_producto').show("100");
    		}else{
    			$('.field-tipo_producto').hide("100");
    		}
		});
    $('#id_gobierno_gti').change(function(){	
    		if (($("#id_gobierno_gti").val()) == 1) {
    			$('.field-nombre_gti').show("100");
    		}else{
    			$('.field-nombre_gti').hide("100");
    		}
		});
        
	}