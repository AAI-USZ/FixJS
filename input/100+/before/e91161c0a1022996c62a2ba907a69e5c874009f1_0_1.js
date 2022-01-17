function (row, col, node) {
      if (visited[row][col]) return;
      if (!node || !node.has(boggle.charAt(row, col))) return;
      node = node.next(boggle.charAt(row, col));

      charStack.push(boggle.charAt(row, col));
      visited[row][col] = true;

      if (row > 0) {
        if (col > 0) {
          findWords(row - 1, col - 1, node);
        }
        findWords(row - 1, col, node);
        if (col < cols - 1) {
          findWords(row - 1, col + 1, node);
        }
      }

      if (col > 0) {
        findWords(row, col - 1, node);
      }
      if (col < cols - 1) {
        findWords(row, col + 1, node);
      }

      if (row < rows - 1) {
        if (col > 0) {
          findWords(row + 1, col - 1, node);
        }
        findWords(row + 1, col, node);
        if (col < cols - 1) {
          findWords(row + 1, col + 1, node);
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