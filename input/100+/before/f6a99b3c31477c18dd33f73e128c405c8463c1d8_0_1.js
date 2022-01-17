function addCategory(new_category, new_category_id){
    if(new_category != ''){
                jQuery('#product_filters').append('<li><a class="button" href="#'+new_category+'" data-categoryid="'+ new_category_id +'" data-filter=".'+ new_category_id +'">'+new_category+'</a></li>');
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