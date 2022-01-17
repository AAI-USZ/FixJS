function() {

        var
          div     = get('div'),
          a       = get('div', '<div>Actual:</div>'),
          b       = get('div', '<div>Expected:</div>'),
          c       = get('div', '<div>Diff:</div>'),
          diff    = imagediff.diff(this.actual, expected),
          canvas  = getCanvas(),
          context;

        canvas.height = diff.height;
        canvas.width  = diff.width;

        context = canvas.getContext('2d');
        context.putImageData(diff, 0, 0);

        a.appendChild(toCanvas(this.actual));
        b.appendChild(toCanvas(expected));
        c.appendChild(canvas);

        div.appendChild(a);
        div.appendChild(b);
        div.appendChild(c);

        return [
          div,
          "Expected not to be equal."
        ];
      }