function select(text) {
      flush();

      textarea.val(text);
      if (text) textarea[0].select();
    }