function (){
dragobj = $('.reschatw');
resobj =  $('#fbDockChatTabs .fbMercuryChatTab.opened');
	dragobj.mousedown(function(e){
	minwidth = 200;
    minheight = 200;
    moff = {
             x:resobj.offset().left - e.pageX,
             y:resobj.offset().top - e.pageY
           };
         $(document).bind({ 'mousemove': function(event) {
             off = resobj.offset(); 
             deltaX = off.left - event.pageX;
             deltaY = off.top - event.pageY;
             if(resobj.width() > minwidth-1){
                 resobj.css('width', resobj.width()+deltaX-moff.x);
             }else{
                 resobj.css('width',minwidth);
             }
             if(resobj.height() > minheight-1){
                 resobj.css('height', resobj.height()+deltaY-moff.y);
             }else{
                 resobj.css('height',minheight);
             }
             }
         });
     });
/*
	$('.reschatw').mousedown(function(){
		if(resmouse == 0){
			resmouse = $('.fbMercuryChatTab').offset(); 
		}
		$('document').bind({ 'mousemove': function(e) {
			resmouse = $('.fbMercuryChatTab').offset(); 
			neww = $('#fbDockChatTabs .fbMercuryChatTab.opened').css('weight')+
			(resmouse.left - e.pageX);
			newh = $('#fbDockChatTabs .fbMercuryChatTab.opened').css('height')+
			(resmouse.top - e.pageY);
			console.log(neww);
			$('#fbDockChatTabs .fbMercuryChatTab.opened').css('weight', neww+'px');
			$('#fbDockChatTabs .fbMercuryChatTab.opened').css('height', newh+'px');
		}});
	});
*/
}