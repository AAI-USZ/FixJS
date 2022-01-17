function(element)
	{
		transformValue[1] = element.$.rotation;
		transformValue[3] = element.$.scaleX;
		transformValue[5] = element.$.scaleY;

		setPrefixedProperty(element.domElement.style, 'transform', transformValue.join(''));
	}