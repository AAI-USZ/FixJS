function (context, text, x, y, maxWidth, lineHeight, texAlign) {
        var words = text.split(" ");
        var line = "";
        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var testWidth = context.measureText(testLine).width - context.measureText(" ").width;
            if (testWidth >= maxWidth) {
                var temWidth = testWidth - context.measureText(words[n]).width - 2 * context.measureText(" ").width;
                var offset;
                switch (texAlign) {
                    case cc.TEXT_ALIGNMENT_LEFT:
                        offset = 0
                        break;
                    case cc.TEXT_ALIGNMENT_RIGHT:
                        offset = maxWidth - temWidth;
                        break;
                    default:
                        offset = (maxWidth - temWidth) / 2;
                        break;
                }
                context.fillText(line, x + offset, y);
                y += lineHeight;
                line = words[n] + " ";
            }
            else {
                line = testLine;
                if (n == words.length - 1) {
                    context.fillText(line, x + offset, y);
                }
            }

        }
    }