f        var inParams, paramIndex, r1, r2, r3, stackIndex, tag;
        tag = token[0];
        if (tag === '{') {
          stack.push({
            i: i,
            level: level
          });
        }
        if (tag === '}') {
          stack.pop();
        }
        if (tag === 'PARAM_START') {
          params.push(i);
        }
        if (tag === 'PARAM_END') {
          params.pop();
        }
        if (tag === 'CALL_START') {
          calls.push(i);
        }
        if (tag === 'CALL_END') {
          calls.pop();
        }
        if (tag === 'INDENT' || tag === '[') {
          level += 1;
        }
        if (tag === 'DEDENT' || tag === ']') {
          level -= 1;
        }
        if (!stack.length) {
          return 1;
        }
        if (params.length) {
          paramIndex = params[params.length - 1];
          stackIndex = stack[stack.length - 1].i;
          inParams = paramIndex > stackIndex;
        }
        if (calls.length) {
          if (tag !== '{' && level <= calls.length) {
            return 1;
          }
        }
        if (!(tag === '{' || ((!inParams) && stack.length && tag === ','))) {
          return 1;
        }
        if (stack.length && stack[stack.length - 1].level !== level) {
          return 1;
        }
        r1 = this.tag(i + 1);
        r2 = this.tag(i + 2);
        r3 = this.tag(i + 3);
        if (r1 === 'IDENTIFIER') {
          if (r2 === ':') {
            return 1;
          }
          action.call(this, this.tokens[i + 1], i + 1);
          return 1;
        }
        if (r1 === '@') {
          if (r3 === ':') {
            return 2;
          }
          action.call(this, this.tokens[i + 1], i + 1);
          return 2;
        }
        return 1;
      };
