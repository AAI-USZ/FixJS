function(internalLength, externalLength, position)

{

    this.scrollbarLength = externalLength - 2 * this.params.width; // Take into account the buttons

    this.dragbarLength = externalLength / internalLength * this.scrollbarLength;

	if (this.dragbarLength > this.scrollbarLength)

		this.dragbarLength = this.scrollbarLength;

   

    if (this.params.orientation == "h")

    {

        this.scrollBg.setAttribute("width", this.scrollbarLength);

        this.scrollTop.bgElement.rectAttributes.width = this.dragbarLength;

    }

    else

    {

        this.scrollBg.setAttribute("height", this.scrollbarLength);

        this.scrollTop.bgElement.rectAttributes.height = this.dragbarLength;

    }



	// Work out the position on the scrollbar of the dragbar

	var scrollbarPos = 0;

	if (internalLength - externalLength > 0)

		scrollbarPos = position * (this.scrollbarLength - this.dragbarLength) / (internalLength - externalLength);

    var retVal = this.setScrollbarPosition(scrollbarPos);



    this.scrollTop.refreshLayout();

    this.refreshLayout();



	return retVal; // This is an update to the position

}