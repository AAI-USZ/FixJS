function stage1(AST) {
    if(hasNext()) {
      switch (peek()) {
        case 'a':
          parseArray(AST);
          break;
        case 'o':
          parseObject(AST);
          break;
        case 'n':
          parseGeneric(AST,'numeric');
          break;
        case 's':
          parseGeneric(AST,'string');
          break;
        case 'b':
          parseGeneric(AST,'boolean');
          break;
        case 'f':
          parseGeneric(AST,'function');
          break;
        case '_':
          parseGeneric(AST, 'any');
          break;
        default:
          throw "Unexpected token at " + index + " : " + peek();
      }
    }

    return AST;
  }