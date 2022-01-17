function SpeechAction(model, controller, item, speechArray)

{

	this.setSpeechArray(speechArray);

	

    this.currentIndex = 0;

    SpeechAction.baseConstructor.call(this, model, controller);

    this.type = "Speech";



    this.speechItem = new ACItemHandler(this.model, item, this.type);

	this.speechItem.addActionListener(this);

}