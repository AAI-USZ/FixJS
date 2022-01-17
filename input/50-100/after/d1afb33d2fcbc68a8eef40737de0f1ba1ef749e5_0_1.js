function applyLabelToConceptNode(element, label)
	{
		if ($(element).hasClass("ghost"))
			label = "("+ label +") ";
		else
			label = label + " ";
		$(element).find("label").text(label);
		adjustAutoLabeling();
	}