function () {
  instaedit.setParserCode(this.getEditor().parserEditor.getSession().getValue());
  instaedit.evalParser();
}