function pasteElement(element){
    //Seam.Remoting.contextPath = "/nuxeo";
    Seam.Remoting.getContext().setConversationId(currentConversationId);
    Seam.Component.getInstance("FileManageActions").pasteWithId(element.id,pasteCallback);
}