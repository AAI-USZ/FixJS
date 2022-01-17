function () {
  instaedit.setParserCode(this.getEditor().parsereditor.getSession().getValue());
  instaedit.evalParser();
}