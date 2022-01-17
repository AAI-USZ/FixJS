function next(){
		if(page < 3){
			page++;
			drawing(page*12,0);
		}else{
			page--;
		}
  }