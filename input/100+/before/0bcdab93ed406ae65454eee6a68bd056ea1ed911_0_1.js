function (i, o) {
        if (this.lastMessages && this.lastMessages[i.from]) {
          console.log(i.text);
          console.log(i.matches);
          try {
            i.replaced = this.lastMessages[i.from].replace(new RegExp(i.matches[1], 'gi'), i.matches[2]);
          } catch (e) {
            console.log('Warning'.yellow, 'Invalid regex in Replace module: ' + i.matches[1]);
          }
          o(i);
        }
      }