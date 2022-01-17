function(){
    
    $('#id_producto_no_maderable').change(function(){	
    		if (($("#id_producto_no_maderable").val()) == 1) {
    			$('.field-tipo_producto').show("100");
    		}else{
    			$('.field-tipo_producto').hide("100");
    		}
		});
        
	}