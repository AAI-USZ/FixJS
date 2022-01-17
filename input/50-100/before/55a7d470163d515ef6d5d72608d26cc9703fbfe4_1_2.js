function(name, i) {
      if(!pre[i + 15]) return;
      pre[i + 15].split(',').forEach(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    }