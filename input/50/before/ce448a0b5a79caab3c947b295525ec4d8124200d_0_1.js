function (e){
      msg = e.data;
      msg = $.parseJSON(msg);
      if(node.onmessage)
        node.onmessage(msg);
    }