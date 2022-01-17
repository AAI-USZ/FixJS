function(doc, position, maxlength, tombsIndivisible) {
    var part, result, resultLen;
    if (position.index >= doc.data.length) {
      throw new Error('Operation goes past the end of the document');
    }
    part = doc.data[position.index];
    result = typeof part === 'string' ? maxlength !== void 0 ? part.slice(position.offset, position.offset + maxlength) : part.slice(position.offset) : maxlength === void 0 || tombsIndivisible ? part - position.offset : Math.min(maxlength, part - position.offset);
    resultLen = result.length || result;
    if ((part.length || part) - position.offset > resultLen) {
      position.offset += resultLen;
    } else {
      position.index++;
      position.offset = 0;
    }
    return result;
  }