function getRemoveContainer(idDiv, idContainer){
	return '<div class="removeDiv"><a href="javascript: removeDrawedContainer(\''+idDiv+'\',\''+idContainer+'\');" title="'+removeContainerMSG+'"><span class="minusIcon"></span>'+removeContainerMSG+'</a></div>';	
}