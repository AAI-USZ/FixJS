function() {
    windowWidth = $(window).width();
    
    initCarrousel();
    

    localStorage.clear();
    
    /*
        // Adding some localstorage dummy data
        var buildings = new Array();
        buildings[0] = new Building(2, 'Stadhuis');
        
        localStorage['favorites'] = JSON.stringify(buildings);
        
        
        var lookLaters = new Array();
        lookLaters[0] = new Building(3, 'Belfort');
        localStorage['lookLater'] = JSON.stringify(lookLaters);
     
        var seen = new Array();
        seen[0] = new Building(2, 'Stadhuis');
        seen[1] = new Building(4, 'Sint-Baafskathedraal'); 
        localStorage['seen'] = JSON.stringify(seen);
		*/
    
    if(localStorage['information'] == 'closed') {
        $('#information, #triangle').hide();   
    }
       
    $('.button').click(function(event) {
        // If user clicks on the span with the text, id of parent div will be retrieved
        if(event.target.id=='') {
            var parent = $(event.target).parent();
            Belfor
            var id = parent.attr('id');
        }
        else {
            var id = event.target.id;
        }
        
        $(".smallIcon").removeClass("active");
        $("#" + id + ".smallIcon").addClass('active');
        
        page = $(this).attr('data-page');
        
        if($(this).attr('data-from') == 'home') {
            $('#carrousel').css('margin-left', '-' + page*windowWidth + 'px'); 
            
            window.location.href = "#home_category";  
        }        
        else {
            changeContent(page);
        }
    });
    
    /**
     * Clicking the 'X' (close) button on the information screen.
     * It sets a value in the localstorage.
     */
    $('#closeInformation').click(function(event) {
        localStorage['information'] = 'closed';
        
        $('#information, #triangle').fadeOut('slow');    
    });
    
    /**
     * Clicking the question mark button on the home screen
     */
    $('#questionMark').click(function(event) {
        $('#information').fadeIn('slow'); 
    });
    
    $('#routeToButton').click(function(event){
        routeToClick();
    })
    
    $('#mustSeeButton').click(function(event){
        mustSeeClick();
    })
    
    /**
     * Action fired when clicking the 'scan' button 
     */
    $('.scan').click(scanCode);  
    
    $('div#fireFilterSection').click(function(event) {
        $('div#filter').slideToggle('slow');    
    });
    
    /**
     * Swipe with your finger from right to left 
     */
    $('#home_category').live('swipeleft', function(event) {
        changeContent(parseInt(page)+1);
    });
    
    /**
     * Swipe with your finger from left to right
     */
    $('#home_category').live('swiperight', function(event) {
        changeContent(parseInt(page)-1);
    });
    
    /**
     * Fill the different categories with content 
     */
    initHomeContent(true);
}