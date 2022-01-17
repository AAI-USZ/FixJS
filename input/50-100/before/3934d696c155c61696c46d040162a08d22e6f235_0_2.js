function(){
	var hash=location.hash.replace("#","");
	if (hash!=="")
	{
		getBoard(hash);
	}else {
		listBoards();
	}
}