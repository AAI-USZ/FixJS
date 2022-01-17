function toggleToolbarControls(bool)
{
	if(!bool)
	{
		$("#knobit1").attr("readonly", "readonly");
		$("#knobit2").attr("readonly", "readonly");
		$("#colorSelector").fadeTo('slow',.3);
		$("#fontstyledropdown").fadeTo("slow",.5);
		$("#fontdropdown").fadeTo("slow",.5);
		$("#mask").css("visibility", "visible")
	
		isdisabled = true;
	}
	else
	{
		$("#knobit1").removeAttr("readonly");
		$("#knobit2").removeAttr("readonly");
		$("#colorSelector").fadeTo('slow',1)
		$("#fontstyledropdown").fadeTo("slow",1);
		$("#fontdropdown").fadeTo("slow", 1)
		$("#mask").css("visibility", "hidden")


		isdisabled = false;		
	}
}