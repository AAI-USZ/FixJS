function() {    
    $('.button').click(function(event) {
        // If user clicks on the span with the text, id of parent div will be retrieved
        if(event.target.id=='') {
            var parent = $(event.target).parent();
            
            var id = parent.attr('id');
        }
        else {
            var id = event.target.id;
        }
        
        homeCategory = id.toLowerCase();
       
        $(".smallIcon").removeClass("active");
        $("#" + id + ".smallIcon").addClass('active');
       
        window.location.href = "#home_category"; 
       
        changeContent();
    });
    
    $("a.scan").click(scanCode);  
    
    $('div#fireFilterSection').click(function(event) {
        $('#filterSection').slideToggle('slow');    
    });
}