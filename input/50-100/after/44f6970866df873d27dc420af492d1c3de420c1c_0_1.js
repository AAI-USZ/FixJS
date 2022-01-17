function(){
	$className = $(this).attr('data-original-title');
	$classURI = $(this).attr('classuri');
	console.log($className);
	console.log($classURI);
	step2($className, $classURI);
}