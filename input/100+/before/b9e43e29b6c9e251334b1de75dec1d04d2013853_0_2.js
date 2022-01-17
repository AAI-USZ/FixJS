function makePointer(slab, pos, allocator, type) {
  assert(type, 'makePointer requires type info');
  if (slab.substr(0, 4) === 'HEAP' || (USE_TYPED_ARRAYS == 1 && slab in IHEAP_FHEAP)) return pos;
  var types = generateStructTypes(type);
  // compress type info and data if possible
  var de;
  try {
    // compress all-zeros into a number (which will become zeros(..)).
    // note that we cannot always eval the slab, e.g., if it contains ident,0,0 etc. In that case, no compression TODO: ensure we get arrays here, not str
    var evaled = typeof slab === 'string' ? eval(slab) : slab;
    de = dedup(evaled);
    if (de.length === 1 && de[0] === 0) {
      slab = evaled.length;
    }
    // TODO: if not all zeros, at least filter out items with type === 0. requires cleverness to know how to skip at runtime though. also
    //       be careful of structure padding
  } catch(e){}
  de = dedup(types);
  if (de.length === 1) {
    types = de[0];
  } else if (de.length === 2 && typeof slab === 'number') {
    // If slab is all zeros, we can compress types even if we have i32,0,0,0,i32,0,0,0 etc. - we do not need the zeros
    de = de.filter(function(x) { return x !== 0 });
    if (de.length === 1) {
      types = de[0];
    }
  }
  return 'allocate(' + slab + ', ' + JSON.stringify(types) + (allocator ? ', ' + allocator : '') + ')';
}