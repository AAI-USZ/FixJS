function(){

  var form = $("form#textile"),
  textArea = form.find("textarea");

  textile = new TextileHelper({
    form: form,
    textArea: textArea
  });

  module("textile");
  
  test("Bold toggle", function(){
    textile.set("This")
      .select("This")
      .click(".bold")
      .match(/\*This\*/)
      .on('bold')
      .click(".bold")
      .off("bold")
      .match(/^This$/);
  });

  test("Bold off edgecases", function(){
    textile.set("*bold*")
      .select("bold")
      .click(".bold")
      .notMatch(/\*/)
    
      .set("This is a *bold* word.")
      .select("bold")
      .click(".bold")
      .notMatch(/\*/)
    
      .set("These are *some bold words* here.")
      .select("some bold words")
      .click(".bold")
      .notMatch(/\*/)
    
    // Same Test with full stop after markup
      .set("These are *some bold words*.\ntricky")
      .select("some bold words")
      .click(".bold")
      .notMatch(/\*/)
    
    // Fuzzy selection
      .set("These are *some bold words*.\ntricky")
      .select("ome bold wor")
      .click(".bold")
      .notMatch(/\*/)

    // Left partial selection
      .set("These are *some bold words*.")
      .select("some")
      .click(".bold")
      .match(/some \*bold/)

    // Left partial selection with paragraph
      .set("h1. *Some bold words* these are.")
      .select("h1. *Some")
      .click(".bold")
      .match(/h1\. Some \*bold/)
    
    // Right partial selection
      .set("These are *some bold words*.")
      .select("words")
      .click(".bold")
      .match(/bold\* words./)

    // multiple Lines
      .set("h1. *important*\n*news headline*\n\n*still important*\n*till* here.")
      .select("h1. *important*\n*news headline*\n\n*still important*\n*till*")
      .click(".bold")
      .notMatch(/\*/)

    // with spaces on
      .set("h1.    soon to be important headline    ")
      .select("h1.    soon to be important headline    ")
      .click(".bold")
      .match(/h1. \*.*\*/);
  });

  test("Bold select", function(){
    textile.set("*This*")
      .select("This")
      .on('bold');
  });

  test("Italic toggle", function(){
    textile.set("This")
      .select("This")
      .click(".italic")
      .match(/_This_/)
      .on('italic')
      .click(".italic")
      .off("italic")
      .match(/^This$/);
  });

  test("Italic select", function(){
    textile.set("_This_")
      .select("This")
      .on('italic');
  });

  test("Bold italic mixed", function(){
    textile.set("This")
      .select("This")
      .click(".italic")
      .match(/_This_/)
      .on('italic')
      .select("_This_")
      .click(".bold")
      .on('italic')
      .on('bold')
      .click(".italic")
      .off("italic")
      .on("bold")
      .match(/\*This\*/);
  });

  test("Reset test should work", function(){
    textile.set("This is not bold")
      .off('bold');
  });

  test("Link select and remove", function(){
    textile.set("\"This\":uri")
      .select("This")
      .on('link')
      .dialog('link', function(d){
        d.click("Remove");
      })
      .notMatch(/uri/)
      .off('link');
  });

  test("Link select and update", function(){
    textile.set("\"This\":uri")
      .select("This")
      .on('link')
      .dialog('link', function(d){
        d.set('uri','src');
        d.click("Update");
      })
      .match(/src/)
      .on('link');
  });
  
  test("Link create", function(){
    textile.set("This is a paragraph.")
      .select("This")
      .off('link')
      .dialog('link', function(d){
        d.set('uri','src');
        d.click("Create");
      })
      .match(/This\":src/)
      .on('link');
  });

  test("Image create", function(){
    textile.set("This is an image: ")
      .dialog('insertImage', function(d){
        d.set('imageUri', 'src');
        d.click("Create");
      })
      .match(/!src!$/)
      .on('insertImage');
  });

  test("Image create with Title", function(){
    textile.set("This is an image: ")
      .dialog('insertImage', function(d){
        d.set('imageUri', 'src');
        d.set('title', 'Title');
        d.click("Create");
      })
      .match(/!src\(Title\)!$/)
      .on('insertImage');
  });

  test("Image create with Title and uri", function(){
    textile.set("This is an image: ")
      .dialog('insertImage', function(d){
        d.set('imageUri', 'src');
        d.set('title', 'Title');
        d.set('uri', 'uri');
        d.click("Create");
      })
      .match(/!src\(Title\)!:uri$/)
      .on('insertImage');
  });

  test("Image update", function(){
    textile.set("!src(Title)!")
      .select("src")
      .on('insertImage')
      .dialog('insertImage', function(d){
        d.set('uri', 'uri');
        d.click("Update");
      })
      .match(/!src\(Title\)!:uri$/)
      .on('insertImage')
      .dialog('insertImage', function(d){
        d.set('title', '');
        d.click("Update");
      })
      .match(/!src!:uri/)
      .dialog('insertImage', function(d){
        d.set('uri', '');
        d.click("Update");
      })
      .match(/!src!/);
  });

  test("Image remove", function(){
    textile.set("!src(Title)!")
      .select("src")
      .on('insertImage')
      .dialog('insertImage', function(d){
        d.click("Remove");
      })
      .match(/^$/)
      .off('insertImage');
  });

  test("Paragraph multiple", function(){
    textile.set("This\n\nThat")
      .selectAll()
      .change(".formatBlock", "h1")
      .match(/h1. This/)
      .match(/h1. That/);
  });

  function testListType(listType, bullet){
    test("List " + listType + " toggle", function(){
      textile.set(bullet + " list")
        .select("list")
        .on(listType)
        .disabled("formatBlock")
        .click("."+ listType)
        .match(/^list/)
        .off(listType)
        .enabled("formatBlock");
    });

    test("List " + listType + " on with new lines", function(){
      textile.set("item1\nitem2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);
    });

    test("List " + listType + " partial on", function(){
      textile.set("item1\n" + bullet + " item2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);

      // other way
      textile.set(bullet + " item1\nitem2")
        .selectAll()
        .off(listType)
        .click("."+listType)
        .match(bullet + " item1\n" + bullet + " item2")
        .on(listType)
        .click("."+ listType)
        .off(listType)
        .notMatch(bullet);
    });

    test("List " + listType + " partial off", function(){
      textile.set(bullet + " item1\n" + bullet + " item2")
        .select("item1")
        .on(listType)
        .click("."+ listType)
        .match("item1\n" + bullet + " item2")
        .off(listType);
    });
  }
  
  var listTypes = {
    unorderedList: "*",
    orderedList: "#"
  }, listType, bullet;
  
  for(listType in listTypes){
    if(listTypes.hasOwnProperty(listType)){
      testListType(listType, listTypes[listType]);
    }
  }

  test("List mixed", function(){
    textile.set("* item1\n# item2")
      .selectAll()
      .off("orderedList")
      .off("unorderedList")
      .click(".orderedList")
      .match("# item1\n# item2")
      .select("item1")
      .click(".unorderedList")
      .match("* item1\n# item2")
      .selectAll()
      .click(".unorderedList")
      .match("* item1\n* item2");
  });

  test("List -> align", function(){
    var string = "* item1\n* item2";
    textile.set(string)
      .select("item1")
      .disabled("alignCenter")
      .disabled("alignRight")
      .disabled("alignLeft")
      .click(".alignCenter")
      .match(string);
  });

  test("List -> italic", function(){
    var string = "* item1\n# item2";
    textile.set(string)
      .select("* item1\n")
      .click(".italic")
      .match("* _item1_\n# item2")
      .click(".italic")
      .match(string)
      .selectAll()
      .click(".italic")
      .click(".italic")
      .match(string);
  });

  test("List -> link", function(){
    var string = "* item1\n# item2";
    textile.set(string)
      .select("* item1\n")
      .dialog("link", function(d){
        d.set('uri','src');
        d.click("Create");
      })
      .match("* \"item1\":src\n# item2")
      .dialog("link", function(d){
        d.click("Remove");
      })
      .match(string);
  });

  test("List -> image", function(){
    var string = "* item1\n# item2";
    textile.set(string)
      .select("* item1\n")
      .dialog("insertImage", function(d){
        d.set('imageUri','src');
        d.click("Create");
      })
      .match("* !src!\n# item2")
      .dialog("insertImage", function(d){
        d.click("Remove");
      })
      .match("* \n# item2");
  });

  test("List -> paragraph", function(){
    textile.set("paragraph\n\n* item1\n\nparagraph")
      .selectAll()
      .change(".formatBlock", "h1")
      .match("h1. paragraph\n\n* item1\n\nh1. paragraph");
  });

  function checkConversion(value, result){
    textile.set(value)
      .click(".wysiwyg")
      .click(".wysiwyg");
    equal(textArea.val(),result || value);
  }
  
  test("Conversion", function(){
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
  });

}