function addCategory(new_category, new_category_id){
    if(new_category != ''){
                var ids = new Array();
                jQuery('#product_filters').append('<li><a class="button" href="#'+new_category+'" data-categoryid="'+ new_category_id +'" data-filter=".'+ new_category_id +'">'+new_category+'</a></li>');  
                var productos = $('.producto');
                for (var i = 0; i< productos.length; i++){ 
                  
                    var li =  '<li><a  href="#'+ new_category +'" data-categoryid="'+ new_category_id +'" data-filter="'+ new_category_id +'" onClick="add_product_category(' + productos[i].id + ',' +  new_category_id +')">' + new_category + '</a></li>';
                    $('#' + productos[i].id).children('.options-producto').children('.tooltip-producto-carpeta').children('.menu-tooltip-producto').children('nav').children('ul').append(li);
                }
    }
    jQuery('#product_filters li:last').css('display','none');
    jQuery('#product_filters li:last').fadeIn('slow');
    closePopup();
    jQuery('#product_filters li:last a').click(function(){ 
            var selector = $(this).attr('data-filter');
            $('#container-productos').isotope({filter: selector});
            return false;
    });
}