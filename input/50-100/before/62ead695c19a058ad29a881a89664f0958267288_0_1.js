function() {
 				++cnt;
 				if( cnt === totalImgs ) {
 					$imgs.show();
 					$container.montage({
 						liquid 	: true,
 						fillLastRow : true,
 						margin: 5,
 						fixedHeight : 140,
 						minw : 100
// 						alternateHeight	: true,
// 						alternateHeightRange : {
// 							min	: 100,
// 							max	: 240
// 						}
 					});
 					if ( typeof callback === 'function' ) {
 						callback();
 					}
 				}
 			}