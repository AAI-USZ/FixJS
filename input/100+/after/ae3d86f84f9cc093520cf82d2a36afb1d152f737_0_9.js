function ( opts, prevElem, currElem, nextElem, diffPos, mainContSize, dir, revdir, currStart ) {
	if ( diffPos.pageX * dir.x > 0 || diffPos.pageY * dir.y > 0 ) {
		prevElem.stop(true,false).css( {
			left: ( ( -mainContSize.width + diffPos.pageX ) * dir.x ) + currStart.x,
			top: ( ( -mainContSize.height + diffPos.pageY ) * dir.y ) + currStart.y,
			display: 'block', opacity: 1
		});
	}
	currElem.stop(true,false).css( {
		left: ( ( 0 + diffPos.pageX ) * dir.x ) + currStart.x,
		top: ( ( 0 + diffPos.pageY ) * dir.y ) + currStart.y,
		display: 'block', opacity: 1
	});
	if ( diffPos.pageX * dir.x < 0 || diffPos.pageY * dir.y < 0 ) {
		nextElem.stop(true,false).css( {
			left: ( ( mainContSize.width + diffPos.pageX ) * dir.x ) + currStart.x,
			top: ( ( mainContSize.height + diffPos.pageY ) * dir.y ) + currStart.y,
			display: 'block', opacity: 1
		});
	}
}