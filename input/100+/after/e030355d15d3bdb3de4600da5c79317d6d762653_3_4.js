function(dest, c, otherC, type) {
    var common, common2, commonOperand, convert, cplength, from, jc, oc, otherCplength, otherFrom, otherTo, p, res, tc, tc1, tc2, to, _i, _len;
    c = clone(c);
    if (c.na !== void 0) {
      c.p.push(0);
    }
    if (otherC.na !== void 0) {
      otherC.p.push(0);
    }
    common = json.commonPath(c.p, otherC.p);
    common2 = json.commonPath(otherC.p, c.p);
    cplength = c.p.length;
    otherCplength = otherC.p.length;
    if (c.na !== void 0) {
      c.p.pop();
    }
    if (otherC.na !== void 0) {
      otherC.p.pop();
    }
    if (otherC.na) {
      if ((common2 != null) && otherCplength >= cplength && otherC.p[common2] === c.p[common2]) {
        if (c.ld !== void 0) {
          oc = clone(otherC);
          oc.p = oc.p.slice(cplength);
          c.ld = json.apply(clone(c.ld), [oc]);
        } else if (c.od !== void 0) {
          oc = clone(otherC);
          oc.p = oc.p.slice(cplength);
          c.od = json.apply(clone(c.od), [oc]);
        }
      }
      json.append(dest, c);
      return dest;
    }
    if ((common2 != null) && otherCplength > cplength && c.p[common2] === otherC.p[common2]) {
      if (c.ld !== void 0) {
        oc = clone(otherC);
        oc.p = oc.p.slice(cplength);
        c.ld = json.apply(clone(c.ld), [oc]);
      } else if (c.od !== void 0) {
        oc = clone(otherC);
        oc.p = oc.p.slice(cplength);
        c.od = json.apply(clone(c.od), [oc]);
      }
    }
    if (common != null) {
      commonOperand = cplength === otherCplength;
      if (otherC.na !== void 0) {

      } else if (otherC.si !== void 0 || otherC.sd !== void 0) {
        if (c.si !== void 0 || c.sd !== void 0) {
          if (!commonOperand) {
            throw new Error("must be a string?");
          }
          convert = function(component) {
            var newC;
            newC = {
              p: component.p[component.p.length - 1]
            };
            if (component.si) {
              newC.i = component.si;
            } else {
              newC.d = component.sd;
            }
            return newC;
          };
          tc1 = convert(c);
          tc2 = convert(otherC);
          res = [];
          text._tc(res, tc1, tc2, type);
          for (_i = 0, _len = res.length; _i < _len; _i++) {
            tc = res[_i];
            jc = {
              p: c.p.slice(0, common)
            };
            jc.p.push(tc.p);
            if (tc.i != null) {
              jc.si = tc.i;
            }
            if (tc.d != null) {
              jc.sd = tc.d;
            }
            json.append(dest, jc);
          }
          return dest;
        }
      } else if (otherC.li !== void 0 && otherC.ld !== void 0) {
        if (otherC.p[common] === c.p[common]) {
          if (!commonOperand) {
            return dest;
          } else if (c.ld !== void 0) {
            if (c.li !== void 0 && type === 'left') {
              c.ld = clone(otherC.li);
            } else {
              return dest;
            }
          }
        }
      } else if (otherC.li !== void 0) {
        if (c.li !== void 0 && c.ld === void 0 && commonOperand && c.p[common] === otherC.p[common]) {
          if (type === 'right') {
            c.p[common]++;
          }
        } else if (otherC.p[common] <= c.p[common]) {
          c.p[common]++;
        }
        if (c.lm !== void 0) {
          if (commonOperand) {
            if (otherC.p[common] <= c.lm) {
              c.lm++;
            }
          }
        }
      } else if (otherC.ld !== void 0) {
        if (c.lm !== void 0) {
          if (commonOperand) {
            if (otherC.p[common] === c.p[common]) {
              return dest;
            }
            p = otherC.p[common];
            from = c.p[common];
            to = c.lm;
            if (p < to || (p === to && from < to)) {
              c.lm--;
            }
          }
        }
        if (otherC.p[common] < c.p[common]) {
          c.p[common]--;
        } else if (otherC.p[common] === c.p[common]) {
          if (otherCplength < cplength) {
            return dest;
          } else if (c.ld !== void 0) {
            if (c.li !== void 0) {
              delete c.ld;
            } else {
              return dest;
            }
          }
        }
      } else if (otherC.lm !== void 0) {
        if (c.lm !== void 0 && cplength === otherCplength) {
          from = c.p[common];
          to = c.lm;
          otherFrom = otherC.p[common];
          otherTo = otherC.lm;
          if (otherFrom !== otherTo) {
            if (from === otherFrom) {
              if (type === 'left') {
                c.p[common] = otherTo;
                if (from === to) {
                  c.lm = otherTo;
                }
              } else {
                return dest;
              }
            } else {
              if (from > otherFrom) {
                c.p[common]--;
              }
              if (from > otherTo) {
                c.p[common]++;
              } else if (from === otherTo) {
                if (otherFrom > otherTo) {
                  c.p[common]++;
                  if (from === to) {
                    c.lm++;
                  }
                }
              }
              if (to > otherFrom) {
                c.lm--;
              } else if (to === otherFrom) {
                if (to > from) {
                  c.lm--;
                }
              }
              if (to > otherTo) {
                c.lm++;
              } else if (to === otherTo) {
                if ((otherTo > otherFrom && to > from) || (otherTo < otherFrom && to < from)) {
                  if (type === 'right') {
                    c.lm++;
                  }
                } else {
                  if (to > from) {
                    c.lm++;
                  } else if (to === otherFrom) {
                    c.lm--;
                  }
                }
              }
            }
          }
        } else if (c.li !== void 0 && c.ld === void 0 && commonOperand) {
          from = otherC.p[common];
          to = otherC.lm;
          p = c.p[common];
          if (p > from) {
            c.p[common]--;
          }
          if (p > to) {
            c.p[common]++;
          }
        } else {
          from = otherC.p[common];
          to = otherC.lm;
          p = c.p[common];
          if (p === from) {
            c.p[common] = to;
          } else {
            if (p > from) {
              c.p[common]--;
            }
            if (p > to) {
              c.p[common]++;
            } else if (p === to) {
              if (from > to) {
                c.p[common]++;
              }
            }
          }
        }
      } else if (otherC.oi !== void 0 && otherC.od !== void 0) {
        if (c.p[common] === otherC.p[common]) {
          if (c.oi !== void 0 && commonOperand) {
            if (type === 'right') {
              return dest;
            } else {
              c.od = otherC.oi;
            }
          } else {
            return dest;
          }
        }
      } else if (otherC.oi !== void 0) {
        if (c.oi !== void 0 && c.p[common] === otherC.p[common]) {
          if (type === 'left') {
            json.append(dest, {
              p: c.p,
              od: otherC.oi
            });
          } else {
            return dest;
          }
        }
      } else if (otherC.od !== void 0) {
        if (c.p[common] === otherC.p[common]) {
          if (!commonOperand) {
            return dest;
          }
          if (c.oi !== void 0) {
            delete c.od;
          } else {
            return dest;
          }
        }
      }
    }
    json.append(dest, c);
    return dest;
  }