function $toString(a) {
  switch ($$runtime.$typeof(a)) {
    case 'string': return a;
    case 'number': return String(a);
    case 'boolean': return String(a);
    default: return 0;
  }
}