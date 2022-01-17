function setupKnobs()
{
	/*$("#knobit1").knob
	(
		{
            "change":function(e)
            {
                    skewx = e;
                    $(editedobject).css("-webkit-transform", "rotate("+rot+"deg) skew("+skewx+"deg, "+skewy+"deg)");
                    $(editedobject).attr("data-skewx", skewx); 
                    $(editedobject).attr("data-skewy", skewy);                              
             }
         }
	);
*/
	$("#rotationxknob").knob
	(
		{
            "change":function(e)
            {
               rotateX = e;    
               selectedorchslide.css("-webkit-transform", " rotate("+currentsliderotation+"deg) rotateX("+rotateX+"deg) rotateY("+e+"deg)");
               selectedorchslide.attr("data-rotate-x", e);

                
            }
         }
	);
	$("#rotationyknob").knob
	(
		{
            "change":function(e)
            {
               rotateY= e;    
               selectedorchslide.css("-webkit-transform", "rotate("+currentsliderotation+"deg) rotateX("+rotateX+"deg) rotateY("+e+"deg)");
               selectedorchslide.attr("data-rotate-y", e);                           
             }
         }
	);
	/*
	$("#knobit2").knob
	(
		{
            "change":function(e)
            {
                    skewy = e
                    $(editedobject).css("-webkit-transform", "rotate("+rot+"deg) skew("+skewx+"deg, "+skewy+"deg)");
                    $(editedobject).attr("data-skewx", skewx); 
                    $(editedobject).attr("data-skewy", skewy);                                
            }
         }
	);
*/
	$("#slideknob").knob
	(
		{
            "change":function(e)
            {
                    currentsliderotation = e;
                    selectedorchslide.attr("data-rotate", e);
                    doExport();
                    selectedorchslide.css("-webkit-transform", "rotate("+e+"deg) rotateX("+rotateX+"deg) rotateY("+rotateY+"deg)");

            }
         }
	);
	$("#depthrange").bind("change", onDepthChange);
	$("#scalerange").bind("change", onScaleChange);

}