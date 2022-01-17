function swapOptions(theSel, index1, index2)

{

	var text, value;

  text = theSel.options[index1].text;

  value = theSel.options[index1].value;

  theSel.options[index1].text = theSel.options[index2].text;

  theSel.options[index1].value = theSel.options[index2].value;

  theSel.options[index2].text = text;

  theSel.options[index2].value = value;

}