function(src, evt)
{
    GridViewItem.superClass.doAction.call(this, src, evt);   

    if (evt.type == "paramChanged")
    {
        if (evt.name == 'speech')
        {
            // This item says something
            this.doSpeech(evt.value);
        }
		else if (evt.name == 'isInvisible')
		{
			this.setVisibilityTop(!evt.value);
		}
    }
}