function replaceEachParagraph(editor, functor){
    var paragraph, children, i, l,
    newParagraphs = $(),
    contents = wysiwygMode.getSelection(editor);

    if(!/h\d|p|(o|u)l/i.test(contents.childNodes[0].nodeName)){
      contents = contents.firstChild;
    }
    children = contents.childNodes;
    l = children.length;

    for(i = 0; i < l ; i++){
      newParagraphs = newParagraphs.add(functor(children[i]));
    }
    wysiwygMode.replaceSelection(editor, newParagraphs);
  }