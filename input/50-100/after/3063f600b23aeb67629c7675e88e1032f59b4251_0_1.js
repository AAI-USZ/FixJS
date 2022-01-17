function __fn(name){
          console.log(name);
          cmds[name] = function(args){
            args == null && (args = []);
            this.push([name].concat(__slice.call(args)));
            return this;
          };
        }