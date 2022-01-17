function()

{

    var result = SpeechAction.superClass.toXML.call(this);      

    result.setAttribute("speech", htmlspecialchars(this.speechArray.join("|")));

	this.speechItem.addToXML(result);

    return result;

}