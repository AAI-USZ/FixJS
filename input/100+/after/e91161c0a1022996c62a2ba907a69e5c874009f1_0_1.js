function (row, col, node) {
      if (visited[row][col]) return;
      if (!node || !node.has(boggle.charAt(row, col))) return;
      node = node.next(boggle.charAt(row, col));

      charStack.push(boggle.charAt(row, col));
      visited[row][col] = true;

      for (var dx = -1; dx <= 1; dx++) {
        var c = col + dx;
        if (c < 0 || c >= cols) continue;

        for (var dy = -1; dy <= 1; dy++) {
          var r = row + dy;
          if (r < 0 || r >= rows) continue;
          if (dx == 0 && dy == 0) continue;

          findWords(r, c, node);
        }
      }

      if (node.isEndOfWord) {
        var s = "";
        for (var i = 0; i < charStack.length; i++) {
          s = s + charStack[i];
        }
        words.push(s);
      }

      visited[row][col] = false;
      charStack.pop();
    }