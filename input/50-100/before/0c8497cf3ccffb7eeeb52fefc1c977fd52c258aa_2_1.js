function(offset, line, column, base, e, sign, exponent) {
                    var raw = base.raw + e + sign + exponent.raw;
                    return new Nodes.Float(parseFloat(raw, 10)).r(raw).p(line, column);
                  }