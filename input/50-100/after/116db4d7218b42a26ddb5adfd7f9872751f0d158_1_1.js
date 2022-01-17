function getDefaultElement(req) {
  return {
    type: req.body.type,
    head: req.body.head,
    nextId: req.body.nextId,
    name: req.body.name,
    required: req.body.required || false,
    text: req.body.text,
    level: req.body.level
  };
}