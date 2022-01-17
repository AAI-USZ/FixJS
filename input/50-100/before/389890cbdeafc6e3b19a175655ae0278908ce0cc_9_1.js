function() {
      var output = "";
      
      switch(this.tag)
      {
        case Enum.constantPoolTag.INTEGER:
          output += "int ";
          break;
        case Enum.constantPoolTag.FLOAT:
          output += "float ";
          break;
        default:
          output += "unknownnumber ";
          break;
      }
      
      return output + this.value;
    }