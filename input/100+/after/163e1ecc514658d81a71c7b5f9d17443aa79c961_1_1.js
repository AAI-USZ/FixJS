function manageCadavers() {
  if (stopped) return;
  if (listOfCadavers.length==0) return;
  if (listOfCadavers.first.data.decompositionDate<=time()) {
    colorDots.remove(listOfCadavers.first.data.element.colorDotsContainer);
    getMatrixCell(listOfCadavers.first.data.element.x,listOfCadavers.first.data.element.y).remove(listOfCadavers.first.data.matrixContainer);
    listOfCadavers.first.data.decompose();
    listOfCadavers.remove(listOfCadavers.first);
  }
  if (listOfCadavers.length==0) return;
  setTimeout(manageCadavers,(listOfCadavers.first.data.decompositionDate-time()+0.1)*1000);
}