function(label) {
            var i = 0, bits;
            while (i < label.lines.length) {
              var item = label.lines[i];
              var value = item;
              // Check if we need to legalize here, and do some trivial legalization along the way
              var isIllegal = false;
              walkInterdata(item, function(item) {
                if (item.intertype == 'getelementptr' || (item.intertype == 'call' && item.ident in LLVM.INTRINSICS_32)) {
                  // Turn i64 args into i32
                  for (var i = 0; i < item.params.length; i++) {
                    if (item.params[i].type == 'i64') item.params[i].type = 'i32';
                  }
                }
                if (isIllegalType(item.valueType) || isIllegalType(item.type)) {
                  isIllegal = true;
                }
              });
              if (!isIllegal) {
                i++;
                continue;
              }
              // Unfold this line. If we unfolded, we need to return and process the lines we just
              // generated - they may need legalization too
              var unfolded = [];
              walkAndModifyInterdata(item, function(subItem) {
                // Unfold all non-value interitems that we can, and also unfold all numbers (doing the latter
                // makes it easier later since we can then assume illegal expressions are always variables
                // accessible through ident$x, and not constants we need to parse then and there)
                if (subItem != item && (!(subItem.intertype in UNUNFOLDABLE) ||
                                       (subItem.intertype == 'value' && isNumber(subItem.ident) && isIllegalType(subItem.type)))) {
                  if (item.intertype == 'phi') {
                    assert(subItem.intertype == 'value', 'We can only unfold illegal constants in phis');
                    // we must handle this in the phi itself, if we unfold normally it will not be pushed back with the phi
                  } else {
                    var tempIdent = '$$emscripten$temp$' + (tempId++);
                    subItem.assignTo = tempIdent;
                    unfolded.unshift(subItem);
                    fixUnfolded(subItem);
                    return { intertype: 'value', ident: tempIdent, type: subItem.type };
                  }
                } else if (subItem.intertype == 'switch' && isIllegalType(subItem.type)) {
                  subItem.switchLabels.forEach(function(switchLabel) {
                    if (switchLabel.value[0] != '$') {
                      var tempIdent = '$$emscripten$temp$' + (tempId++);
                      unfolded.unshift({
                        assignTo: tempIdent,
                        intertype: 'value',
                        ident: switchLabel.value,
                        type: subItem.type
                      });
                      switchLabel.value = tempIdent;
                    }
                  });
                }
              });
              if (unfolded.length > 0) {
                interpLines(label.lines, i-1, unfolded);
                Array.prototype.splice.apply(label.lines, [i, 0].concat(unfolded));
                continue; // remain at this index, to unfold newly generated lines
              }
              // This is an illegal-containing line, and it is unfolded. Legalize it now
              dprint('legalizer', 'Legalizing ' + item.intertype + ' at line ' + item.lineNum);
              switch (item.intertype) {
                case 'store': {
                  var toAdd = [];
                  bits = getBits(item.valueType);
                  var elements;
                  elements = getLegalVars(item.value.ident, bits);
                  var j = 0;
                  elements.forEach(function(element) {
                    var tempVar = '$st$' + i + '$' + j;
                    toAdd.push({
                      intertype: 'getelementptr',
                      assignTo: tempVar,
                      ident: item.pointer.ident,
                      type: '[0 x i32]*',
                      params: [
                        { intertype: 'value', ident: item.pointer.ident, type: '[0 x i32]*' }, // technically a bitcase is needed in llvm, but not for us
                        { intertype: 'value', ident: '0', type: 'i32' },
                        { intertype: 'value', ident: j.toString(), type: 'i32' }
                      ],
                    });
                    var actualSizeType = 'i' + element.bits; // The last one may be smaller than 32 bits
                    toAdd.push({
                      intertype: 'store',
                      valueType: actualSizeType,
                      value: { intertype: 'value', ident: element.ident, type: actualSizeType },
                      pointer: { intertype: 'value', ident: tempVar, type: actualSizeType + '*' },
                      ident: tempVar,
                      pointerType: actualSizeType + '*',
                      align: item.align,
                    });
                    j++;
                  });
                  Types.needAnalysis['[0 x i32]'] = 0;
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
                // call, return: Return value is in an unlegalized array literal. Not fully optimal.
                case 'call': {
                  bits = getBits(value.type);
                  var elements = getLegalVars(item.assignTo, bits);
                  var toAdd = [value];
                  // legalize parameters
                  legalizeFunctionParameters(value.params);
                  if (value.assignTo) {
                    // legalize return value
                    var j = 0;
                    toAdd = toAdd.concat(elements.map(function(element) {
                      return {
                        intertype: 'value',
                        assignTo: element.ident,
                        type: 'i' + bits,
                        ident: value.assignTo + '[' + (j++) + ']'
                      };
                    }));
                  }
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
                case 'return': {
                  bits = getBits(item.type);
                  var elements = getLegalVars(item.value.ident, bits);
                  item.value.ident = '[' + elements.map(function(element) { return element.ident }).join(',') + ']';
                  i++;
                  continue;
                }
                case 'invoke': {
                  legalizeFunctionParameters(value.params);
                  // We can't add lines after this, since invoke already modifies control flow. So we handle the return in invoke
                  i++;
                  continue;
                }
                case 'value': {
                  bits = getBits(value.type);
                  var elements = getLegalVars(item.assignTo, bits);
                  var values = getLegalLiterals(item.ident, bits);
                  var j = 0;
                  var toAdd = elements.map(function(element) {
                    return {
                      intertype: 'value',
                      assignTo: element.ident,
                      type: 'i' + bits,
                      ident: values[j++].ident
                    };
                  });
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
                case 'load': {
                  bits = getBits(value.valueType);
                  var elements = getLegalVars(item.assignTo, bits);
                  var j = 0;
                  var toAdd = [];
                  elements.forEach(function(element) {
                    var tempVar = '$st$' + i + '$' + j;
                    toAdd.push({
                      intertype: 'getelementptr',
                      assignTo: tempVar,
                      ident: value.pointer.ident,
                      type: '[0 x i32]*',
                      params: [
                        { intertype: 'value', ident: value.pointer.ident, type: '[0 x i32]*' }, // technically bitcast is needed in llvm, but not for us
                        { intertype: 'value', ident: '0', type: 'i32' },
                        { intertype: 'value', ident: j.toString(), type: 'i32' }
                      ]
                    });
                    var actualSizeType = 'i' + element.bits; // The last one may be smaller than 32 bits
                    toAdd.push({
                      intertype: 'load',
                      assignTo: element.ident,
                      pointerType: actualSizeType + '*',
                      valueType: actualSizeType,
                      type: actualSizeType, // XXX why is this missing from intertyper?
                      pointer: { intertype: 'value', ident: tempVar, type: actualSizeType + '*' },
                      ident: tempVar,
                      pointerType: actualSizeType + '*',
                      align: value.align
                    });
                    j++;
                  });
                  Types.needAnalysis['[0 x i32]'] = 0;
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
                case 'phi': {
                  bits = getBits(value.type);
                  var toAdd = [];
                  var elements = getLegalVars(item.assignTo, bits);
                  var j = 0;
                  var literalValues = {}; // special handling of literals - we cannot unfold them normally
                  value.params.map(function(param) {
                    if (isNumber(param.value.ident)) {
                      literalValues[param.value.ident] = getLegalLiterals(param.value.ident, bits);
                    }
                  });
                  elements.forEach(function(element) {
                    toAdd.push({
                      intertype: 'phi',
                      assignTo: element.ident,
                      type: 'i' + element.bits,
                      params: value.params.map(function(param) {
                        return {
                          intertype: 'phiparam',
                          label: param.label,
                          value: {
                           intertype: 'value',
                           ident: (param.value.ident in literalValues) ? literalValues[param.value.ident][j].ident : (param.value.ident + '$' + j),
                           type: 'i' + element.bits,
                          }
                        };
                      })
                    });
                    j++;
                  });
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
                case 'switch': {
                  i++;
                  continue; // special case, handled in makeComparison
                }
                case 'bitcast': {
                  var inType = item.type2;
                  var outType = item.type;
                  if ((inType in Runtime.INT_TYPES && outType in Runtime.FLOAT_TYPES) ||
                      (inType in Runtime.FLOAT_TYPES && outType in Runtime.INT_TYPES)) {
                    i++;
                    continue; // special case, handled in processMathop
                  }
                  // fall through
                }
                case 'inttoptr': case 'ptrtoint': case 'zext': case 'sext': case 'trunc': case 'ashr': case 'lshr': case 'shl': case 'or': case 'and': case 'xor': {
                  value = {
                    op: item.intertype,
                    variant: item.variant,
                    type: item.type,
                    params: item.params
                  };
                  // fall through
                }
                case 'mathop': {
                  var toAdd = [];
                  var sourceBits = getBits(value.params[0].type);
                  // All mathops can be parametrized by how many shifts we do, and how big the source is
                  var shifts = 0;
                  var targetBits = sourceBits;
                  var processor = null;
                  var signed = false;
                  switch (value.op) {
                    case 'ashr': {
                      signed = true;
                      // fall through
                    }
                    case 'lshr': {
                      shifts = parseInt(value.params[1].ident);
                      break;
                    }
                    case 'shl': {
                      shifts = -parseInt(value.params[1].ident);
                      break;
                    }
                    case 'sext': {
                      signed = true;
                      // fall through
                    }
                    case 'trunc': case 'zext': case 'ptrtoint': {
                      targetBits = getBits(value.params[1] ? value.params[1].ident : value.type);
                      break;
                    }
                    case 'inttoptr': {
                      targetBits = 32;
                      break;
                    }
                    case 'bitcast': {
                      break;
                    }
                    case 'select': {
                      sourceBits = targetBits = getBits(value.params[1].type);
                      var otherElementsA = getLegalVars(value.params[1].ident, sourceBits);
                      var otherElementsB = getLegalVars(value.params[2].ident, sourceBits);
                      processor = function(result, j) {
                        return {
                          intertype: 'mathop',
                          op: 'select',
                          type: 'i' + otherElementsA[j].bits,
                          params: [
                            value.params[0],
                            { intertype: 'value', ident: otherElementsA[j].ident, type: 'i' + otherElementsA[j].bits },
                            { intertype: 'value', ident: otherElementsB[j].ident, type: 'i' + otherElementsB[j].bits }
                          ]
                        };
                      };
                      break;
                    }
                    case 'or': case 'and': case 'xor': {
                      var otherElements = getLegalVars(value.params[1].ident, sourceBits);
                      processor = function(result, j) {
                        return {
                          intertype: 'mathop',
                          op: value.op,
                          type: 'i' + otherElements[j].bits,
                          params: [
                            result,
                            { intertype: 'value', ident: otherElements[j].ident, type: 'i' + otherElements[j].bits }
                          ]
                        };
                      };
                      break;
                    }
                    case 'add': case 'sub': case 'sdiv': case 'udiv': case 'mul': case 'urem': case 'srem':
                    case 'icmp':case 'uitofp': case 'sitofp': {
                      // We cannot do these in parallel chunks of 32-bit operations. We will handle these in processMathop
                      i++;
                      continue;
                    }
                    default: throw 'Invalid mathop for legalization: ' + [value.op, item.lineNum, dump(item)];
                  }
                  // Do the legalization
                  var sourceElements;
                  if (sourceBits <= 32) {
                    // The input is a legal type
                    sourceElements = [{ ident: value.params[0].ident, bits: sourceBits }];
                  } else {
                    sourceElements = getLegalVars(value.params[0].ident, sourceBits);
                  }
                  if (!isNumber(shifts)) {
                    // We can't statically legalize this, do the operation at runtime TODO: optimize
                    assert(sourceBits == 64, 'TODO: handle nonconstant shifts on != 64 bits');
                    value.intertype = 'value';
                    value.ident = 'Runtime.bitshift64(' + sourceElements[0].ident + ', ' +
                                                          sourceElements[1].ident + ',"' + value.op + '",' + value.params[1].ident + '$0);' +
                                  'var ' + value.assignTo + '$0 = ' + value.assignTo + '[0], ' + value.assignTo + '$1 = ' + value.assignTo + '[1];';
                    i++;
                    continue;
                  }
                  var targetElements = getLegalVars(item.assignTo, targetBits);
                  var sign = shifts >= 0 ? 1 : -1;
                  var shiftOp = shifts >= 0 ? 'shl' : 'lshr';
                  var shiftOpReverse = shifts >= 0 ? 'lshr' : 'shl';
                  var whole = shifts >= 0 ? Math.floor(shifts/32) : Math.ceil(shifts/32);
                  var fraction = Math.abs(shifts % 32);
                  if (signed) {
                    var signedFill = '((' + sourceElements[sourceElements.length-1].ident + '|0) < 0 ? -1 : 0)';
                    var signedKeepAlive = { intertype: 'value', ident: sourceElements[sourceElements.length-1].ident, type: 'i32' };
                  }
                  for (var j = 0; j < targetElements.length; j++) {
                    var result = {
                      intertype: 'value',
                      ident: (j + whole >= 0 && j + whole < sourceElements.length) ? sourceElements[j + whole].ident : (signed ? signedFill : '0'),
                      params: [(signed && j + whole > sourceElements.length) ? signedKeepAlive : null],
                      type: 'i32',
                    };
                    if (j == 0 && isUnsignedOp(value.op) && sourceBits < 32) {
                      // zext sign correction
                      result.ident = makeSignOp(result.ident, 'i' + sourceBits, 'un', 1, 1);
                    }
                    if (fraction != 0) {
                      var other = {
                        intertype: 'value',
                        ident: (j + sign + whole >= 0 && j + sign + whole < sourceElements.length) ? sourceElements[j + sign + whole].ident : (signed ? signedFill : '0'),
                        params: [(signed && j + sign + whole > sourceElements.length) ? signedKeepAlive : null],
                        type: 'i32',
                      };
                      other = {
                        intertype: 'mathop',
                        op: shiftOp,
                        type: 'i32',
                        params: [
                          other,
                          { intertype: 'value', ident: (32 - fraction).toString(), type: 'i32' }
                        ]
                      };
                      result = {
                        intertype: 'mathop',
                        // shifting in 1s from the top is a special case
                        op: (signed && shifts >= 0 && j + sign + whole >= sourceElements.length) ? 'ashr' : shiftOpReverse,
                        type: 'i32',
                        params: [
                          result,
                          { intertype: 'value', ident: fraction.toString(), type: 'i32' }
                        ]
                      };
                      result = {
                        intertype: 'mathop',
                        op: 'or',
                        type: 'i32',
                        params: [
                          result,
                          other
                        ]
                      }
                    }
                    if (targetElements[j].bits < 32 && shifts < 0) {
                      // truncate bits that fall off the end. This is not needed in most cases, can probably be optimized out
                      result = {
                        intertype: 'mathop',
                        op: 'and',
                        type: 'i32',
                        params: [
                          result,
                          { intertype: 'value', ident: (Math.pow(2, targetElements[j].bits)-1).toString(), type: 'i32' }
                        ]
                      }
                    }
                    if (processor) {
                      result = processor(result, j);
                    }
                    result.assignTo = targetElements[j].ident;
                    toAdd.push(result);
                  }
                  if (targetBits <= 32) {
                    // We are generating a normal legal type here
                    legalValue = {
                      intertype: 'value',
                      ident: targetElements[0].ident + (targetBits < 32 ? '&' + (Math.pow(2, targetBits)-1) : ''),
                      type: 'rawJS'
                    };
                    legalValue.assignTo = item.assignTo;
                    toAdd.push(legalValue);
                  }
                  i += removeAndAdd(label.lines, i, toAdd);
                  continue;
                }
              }
              assert(0, 'Could not legalize illegal line: ' + [item.lineNum, dump(item)]);
            }
            if (dcheck('legalizer')) dprint('zz legalized: \n' + dump(label.lines));
          }