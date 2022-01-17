function(name, i) {
      if(!pre[i + 16]) return;
      pre[i + 16].split(',').forEach(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    }