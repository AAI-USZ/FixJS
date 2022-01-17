function eachAttribRun(attribs, func /*(startInNewText, endInNewText, attribs)*/ )
  {
    var attribsIter = Changeset.opIterator(attribs);
    var textIndex = 0;
    var newTextStart = 0;
    var newTextEnd = newText.length - 1;
    while (attribsIter.hasNext())
    {
      var op = attribsIter.next();
      var nextIndex = textIndex + op.chars;
      if (!(nextIndex <= newTextStart || textIndex >= newTextEnd))
      {
        func(Math.max(newTextStart, textIndex), Math.min(newTextEnd, nextIndex), op.attribs);
      }
      textIndex = nextIndex;
    }
  }