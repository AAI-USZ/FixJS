function(mat, x, y, z, resultMat) {
  var a00 = mat[0], a10 = mat[1], a20 = mat[2], a30 = mat[3];
  var a01 = mat[4], a11 = mat[5], a21 = mat[6], a31 = mat[7];
  var a02 = mat[8], a12 = mat[9], a22 = mat[10], a32 = mat[11];
  var a03 = mat[12], a13 = mat[13], a23 = mat[14], a33 = mat[15];

  resultMat[0] = a00 * x;
  resultMat[1] = a10 * x;
  resultMat[2] = a20 * x;
  resultMat[3] = a30 * x;

  resultMat[4] = a01 * y;
  resultMat[5] = a11 * y;
  resultMat[6] = a21 * y;
  resultMat[7] = a31 * y;

  resultMat[8] = a02 * z;
  resultMat[9] = a12 * z;
  resultMat[10] = a22 * z;
  resultMat[11] = a32 * z;

  resultMat[12] = a03;
  resultMat[13] = a13;
  resultMat[14] = a23;
  resultMat[15] = a33;

  return resultMat;
}