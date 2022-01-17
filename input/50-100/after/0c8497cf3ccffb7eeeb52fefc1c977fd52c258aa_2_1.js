function(offset, line, column, base, e, sign, exponent) {
                    var raw = base.raw + e + sign + exponent.raw;
                    return new Nodes.Float(parseFloat('' + base.data + e + sign + exponent.data, 10)).r(raw).p(line, column);
                  }