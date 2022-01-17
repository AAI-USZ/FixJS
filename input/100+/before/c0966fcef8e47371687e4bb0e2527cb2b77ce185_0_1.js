f    var tag, pre, __ref;
    tag = token[0];
    if (tag === '=>' || tag === 'POST_IF') {
      return true;
    }
    if (!skipBlock) {
      if (token.alias && ((__ref = token[1]) === '&&' || __ref === '||') || (tag === 'TO' || tag === 'BY' || tag === 'IMPLEMENTS')) {
        return true;
      }
    }
    pre = tokens[i - 1];
    switch (tag) {
    case 'NEWLINE':
      return pre[0] !== ',';
    case 'DOT':
    case '?':
      return !skipBlock && (pre.spaced || pre[0] === 'DEDENT');
    case 'SWITCH':
      seenSwitch = true;
      // fallthrough
    case 'IF':
    case 'CLASS':
    case 'FUNCTION':
    case 'LET':
    case 'WITH':
      skipBlock = true;
      break;
    case 'CASE':
      if (seenSwitch) {
        skipBlock = true;
      } else {
        return true;
      }
      break;
    case 'INDENT':
      if (skipBlock) {
        return skipBlock = false;
      }
      return (__ref = pre[0]) !== '{' && __ref !== '[' && __ref !== ',' && __ref !== '->' && __ref !== ':' && __ref !== 'ELSE' && __ref !== 'ASSIGN' && __ref !== 'IMPORT' && __ref !== 'UNARY' && __ref !== 'DEFAULT' && __ref !== 'TRY' && __ref !== 'CATCH' && __ref !== 'FINALLY' && __ref !== 'HURL' && __ref !== 'DO';
    case 'WHILE':
      if (token.done) {
        return false;
      }
      // fallthrough
    case 'FOR':
      skipBlock = true;
      return able(tokens, i) || pre[0] === 'CREMENT';
    }
    return false;
  }
