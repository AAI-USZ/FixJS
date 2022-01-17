function () {
            expect(canvas.get(0)).toImageDiffEqual(referenceImg.get(0), 90);
        }