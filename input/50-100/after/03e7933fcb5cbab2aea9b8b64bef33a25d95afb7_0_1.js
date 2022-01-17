function lookupHandler(lookup, type, begin, reached) {
  data = {
    type : type,
    time : new Date().getTime() - begin,
    reached  : reached.size(),
    queries  : lookup._mapped.length,
    closest  : reached.size() > 0 ? reached.getPeer(0).getDistanceTo(lookup._target) : -1,
    rejected : lookup.isRejected()
  };
  emit('iterative_find', data);
}