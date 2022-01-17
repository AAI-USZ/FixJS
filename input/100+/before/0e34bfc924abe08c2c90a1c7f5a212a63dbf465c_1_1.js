function() {
        var b = context.createIndexBuffer(3, BufferUsage.STATIC_DRAW, IndexDatatype.UNSIGNED_BYTE);
        expect(b.isDestroyed()).toEqual(false);
        b.destroy();
        expect(b.isDestroyed()).toEqual(true);
    }