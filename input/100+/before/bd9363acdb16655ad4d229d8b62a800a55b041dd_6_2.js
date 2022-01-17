function(){
      w.set(bullet + " list")
        .select(tag)
        .on(listType)
        .disabled("formatBlock")
        .click("."+ listType)
        .notMatch(tag)
        .off(listType)
        .enabled("formatBlock");
    }