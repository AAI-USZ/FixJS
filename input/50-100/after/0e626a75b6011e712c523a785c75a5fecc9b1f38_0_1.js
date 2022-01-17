function scrollAnimation(){
	
	// console.log('scrollPosition: '+scrollPosition+' scrollAmount: '+scrollAmount+' scrollAdjusted: '+scrollAdjusted+' scrollPercent: '+scrollPercent+' scrollScale: '+scrollScale);
	
	$('.item').each(function(index){
		move(index+1);	
	});
	
}