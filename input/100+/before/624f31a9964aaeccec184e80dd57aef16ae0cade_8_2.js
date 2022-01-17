function(){
    checkConversion("This\n\nThat");
    checkConversion("h1. This\n\nh2. That");
    checkConversion("p(left). This\nThat");
    checkConversion("h2(right). This");
    checkConversion("*bold*");
    checkConversion(" *bold* ");
    checkConversion("_italic_");
    checkConversion(" _italic_ ");
    checkConversion("\"This\":uri");
    checkConversion(" \"This\":uri ");
    checkConversion("!src!");
    checkConversion("!src!:uri");
    checkConversion("!src(Title)!");
    checkConversion("!src(Title)!:uri");
    checkConversion("* test\n* test\n\n* test");
    checkConversion("* test\n# test", "* test\n\n# test");
    checkConversion("* _test<br>test_\n* test");
    checkConversion("&nbsp;", " ");
    checkConversion("* list\n\nh1. heading");
    checkConversion("_test<br>test_", "_test_\n_test_");
  }