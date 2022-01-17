function(translation, result) {
        return Matrix4.fromRotationTranslation(Matrix3.IDENTITY, translation, result);
    }