function (inlineWidget) {
                editor.addInlineWidget(pos, inlineWidget);
                PerfUtils.addMeasurement(PerfUtils.OPEN_INLINE_EDITOR);
                result.resolve();
            }