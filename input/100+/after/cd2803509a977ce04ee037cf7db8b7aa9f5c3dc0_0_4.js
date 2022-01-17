function () {

				var pos = this.pos,

					labelOptions = options.labels,

					str,

					withLabel = !((pos === min && !pick(options.showFirstLabel, 1)) ||

						(pos === max && !pick(options.showLastLabel, 0))),

					width = (categories && horiz && categories.length &&

						!labelOptions.step && !labelOptions.staggerLines &&

						!labelOptions.rotation &&

						plotWidth / categories.length) ||

						(!horiz && plotWidth / 2),

					css,

					label = this.label;





				// get the string

				str = labelFormatter.call({

						isFirst: pos === tickPositions[0],

						isLast: pos === tickPositions[tickPositions.length - 1],

						dateTimeLabelFormat: dateTimeLabelFormat,

						value: (categories && categories[pos] ? categories[pos] : pos)

					});





				// prepare CSS

				css = width && { width: mathMax(1, mathRound(width - 2 * (labelOptions.padding || 10))) + PX };

				css = extend(css, labelOptions.style);



				// first call

				if (!defined(label)) {

					this.label =

						defined(str) && withLabel && labelOptions.enabled ?

							renderer.text(

									str,

									0,

									0

								)

								.attr({

									align: labelOptions.align,

									rotation: labelOptions.rotation

								})

								// without position absolute, IE export sometimes is wrong

								.css(css) :

							null;



				// update

				} else if (label) {

					label.attr({ text: str })

						.css(css);

				}

			}