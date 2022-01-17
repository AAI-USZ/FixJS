function SpeechAction(model, controller, item, speechArray)

{

    SpeechAction.baseConstructor.call(this, model, controller);



	this.setSpeechArray(speechArray);	

    this.currentIndex = 0;

    this.type = "Speech";



    this.speechItem = new ACItemHandler(this.model, item, this.type);

	this.speechItem.addActionListener(this);

}