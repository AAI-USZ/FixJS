function (req, res, next) {
  req.events
    .find({ starts_at: { $gt: new Date() }})
    .sort({ starts_at: 1 })
    .toArray(function (error, found) {
      if (error) { return new Error(error); }
      req.found = found;
      next();
    });
}