function eachParagraph(editor, functor) {
    var paragraphs = textileMode.getParagraphs(editor), paragraphsLength = paragraphs.length;

    for(i = 0; i < paragraphsLength; i++) {
      paragraphs[i] = functor(paragraphs[i]);
    }
    textileMode.setParagraphs(editor, paragraphs);
  }