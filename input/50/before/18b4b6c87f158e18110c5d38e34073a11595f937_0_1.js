function before(){
		if(page > 0){
			page--;
			drawing(page*12);
		}else{
			drawing(0);
		}
  }