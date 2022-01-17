function(err, list){

          for(var i = 0; i < list.length; i += 1){

            if(self.ignoreHidden && list[i].charAt(0).match(/[\._]/)) continue;

            self.scanQueue.push(path.join(filename, list[i]));

          }

          self.addNextFile();

        }