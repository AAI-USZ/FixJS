function(xml)

{

    SpeechAction.superClass.fromXML.call(this, xml);      



	this.speechItem.fromXML(xml);

    var speechText = htmlspecialchars_decode(xml.getAttribute('speech'));

    this.setSpeechArray(speechText.split('|'));

}