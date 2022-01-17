function(name, i) {
      if(!pre[i + 12]) return;
      pre[i + 12].split(',').each(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    }