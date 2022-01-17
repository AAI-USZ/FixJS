function parser(dir, depth) {
        while (true) {
          if (lines[i] === '') {
            continue;
          }
          if (lines.length <= i) {
            break;
          }
          var spaceCount = lines[i].match(/^ */)[0].length;
          if (depth - spaceCount === -1) {
            dir.push(condition = new Condition(lines[i]));
            i++;
            parser(condition.children, spaceCount);
          } else {
            break;
          }
        }
      }