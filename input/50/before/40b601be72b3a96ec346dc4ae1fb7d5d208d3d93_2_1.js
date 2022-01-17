function (){
	var year = this.getFullYear();

	if((year % 100 != 0 && year % 4 == 0)  || year%400 == 0)
	{
		return 366;
	}
	else
	{
		return 365;
	}	
}