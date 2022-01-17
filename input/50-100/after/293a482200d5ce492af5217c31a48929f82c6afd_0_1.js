function(e) {
		document.getElementById('czbox-loading').style.display = 'none';
		
		if(window !== this) // IE
		{
			this.parentNode.style.opacity = 1;
		}
		else
		{
			CzBox.framework.getSrcElement(e).parentNode.parentNode.style.opacity = 1;
		}
		
// TODO: animate
//		$(this).parent().animate({
//			opacity: 1
//		}, 600);
	}