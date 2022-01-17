function before(){
		if(page > 0){
			page--;
			drawing(page*12,0);
		}else{
			drawing(0,0);
		}
  }