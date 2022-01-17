function positionGroups(){
	var group1height = group1.height()*windowScale,
			group1width	 = group1.width()*windowScale,
			group2height = group2.height()*windowScale,
			group4height = group4.height()*windowScale;
			
			// console.log(group1height);
	
	for(var i=1;i<15;i++){
		if (i<7){
			// GROUP 1
			item[i].selector.css({'left':item[i].adjustedLeft});
		} else if (i==7 || i==9 || i==14) {
			// BOTTLE SPIN
			item[i].selector.css({'margin':'0 '+(-item[i].adjustedWidth/2)+'px'});
		} else if (i==8 || i==10 || i==11 || i==13) {
			// BOTTLE SPIN TEXT
			item[i].selector.css({'left':-item[i].adjustedWidth});
		} else if (i==12) {
			item[i].currentLeft = windowWidth;
			item[i].selector.css({'left':item[i].currentLeft});
		}
	}
			
	group1.css({'top':floorPosition-group1height,'height':group1height,'width':group1width,'margin':'0 '+(-(group1width/2))+'px'});
	var group2top = (group1.offset().top+group1height)+(windowHeight*0.6);
	group2.css({'top':group2top,'height':group2height});
	group3.css({'top':windowHeight/2});
	group4.css({'top':(group2top+(windowHeight*2)+item[9].adjustedHeight),'height':group4height});
	group5.css({'top':windowHeight/2});
	group6.css({'top':(windowHeight/2)+(item[11].adjustedHeight/2)});
	group7.css({'top':windowHeight/2});
	group8.css({'top':windowHeight/2});
	group9.css({'top':scrollMax+(item[13].adjustedHeight*2),'height':item[14].adjustedHeight});
	$('#scroll-container').animate({'opacity':'1'},400);
}