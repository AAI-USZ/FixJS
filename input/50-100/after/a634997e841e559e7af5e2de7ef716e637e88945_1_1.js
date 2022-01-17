function $toBoolean(a) {
  switch ($$runtime.$typeof(a)) {
    case 'string': return $$runtime.$sizeof(a) > 0;
    case 'number': return a !== 0;
    case 'boolean': return a;
    case 'function':
    case 'array':
    case 'object':
      return true;
    case 'nil':
      return false;
    default: return false;
  }
}