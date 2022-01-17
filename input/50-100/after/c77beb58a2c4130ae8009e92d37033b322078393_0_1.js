function copyElementIfIdNotStartsWith(element, idPrefix){
    //Seam.Remoting.contextPath = "/nuxeo";
    if (element && element.id.indexOf(idPrefix) <= -1) {
    	Seam.Remoting.getContext().setConversationId(currentConversationId);
        Seam.Component.getInstance("FileManageActions").copyWithId(element.id,copyCallback);    	
    }
}