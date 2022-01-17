function () {
      el = create();
      // Type "Yap Ming" and "\t"
      el.focus();
      el.val("Yao Ming");
      el.simulate("keydown", {"keyCode" : keyCode.TAB});

      sel = selections();
      equal(sel.length, 1, "Should have one name");
      equal($(sel[0]).text(), "×Yao Ming", "Should be Yao Ming");
      equal(value().val(), ",Yao Ming,", "Should be Yao Ming");
      remove();
    }