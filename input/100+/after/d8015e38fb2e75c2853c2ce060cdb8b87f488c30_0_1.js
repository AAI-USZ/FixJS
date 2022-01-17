function(){
	
	
	  //  $(document).bind("contextmenu",function(e){
	 //       return false;
	 //   });

	
		 showHand();
		 setTimeout('hideHand()',5000);

		
		    
		    document.getElementById('nextButton').onclick = function()
		    {
		    	
		    	 valuenow = parseFloat(slideshow.getClosestSteps(slideshow.value.current));
		    	 currentpage =(valuenow*(totalSlides-1)+1);
		    	//$('#nextButton').append(currentpage+1 + ' ');
		        slideshow.setStep(currentpage+1);
		        return false;
		    }
		    
		    document.getElementById('previousButton').onclick = function()
		    {
		    	
		    	 valuenow = parseFloat(slideshow.getClosestSteps(slideshow.value.current));
		    	 currentpage =(valuenow*(totalSlides-1)+1);
		    	//$('#previousButton').append(currentpage-1 + ' ');
		        slideshow.setStep(currentpage-1);
		        return false;
		    }
  
  
  
}