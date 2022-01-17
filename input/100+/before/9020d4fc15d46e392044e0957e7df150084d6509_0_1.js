function(years){
			$('.addaratebtn').unbind('click');
			$('#tailNumModalForm .modal-body').empty().append('<div class="row"><div class="cell"><label for="addTailNumField">Tail Number</label><input type="text" id="addTailNumField" value="" placeholder="Tail Number" /></div><div class="cell"><label for="tailNumModNum">Mod Number:</label><input type="text" name="tailNumModNum" id="tailNumModNum"></div><div class="cell"><label for="tailNumAircraftType">Aircraft Type</label><select name="" id="tailNumAircraftType"><option value="">Select Aircraft Type</option><option value="46010642">*SL-3/4</option><option value="21010642">204 Super B</option><option value="20010642">204B (UH-1 Series)</option><option value="22010642">205A-1</option><option value="23010642">205A-1++</option><option value="28010642">206B-II</option><option value="29010642">206B-III</option><option value="30010642">206L-1</option><option value="31010642">206L-3</option><option value="32010642">206L-4</option><option value="33010642">210</option><option value="34010642">212</option><option value="35010642">214B</option><option value="36010642">214B1</option><option value="37010642">214ST</option><option value="38010642">222A</option><option value="39010642">222B</option><option value="40010642">222UT</option><option value="41010642">407</option><option value="42010642">412</option><option value="43010642">412HP</option><option value="19010642">47/SOLOY</option><option value="53010642">500C</option><option value="54010642">500D/E</option><option value="55010642">520N</option><option value="56010642">530F</option><option value="57010642">600N</option><option value="58010642">900/902</option><option value="7010642">AS 332L1</option><option value="9010642">AS-330J</option><option value="1010253">AS-350B</option><option value="11010642">AS-350B-1</option><option value="12010642">AS-350B-2</option><option value="13010642">AS-350B-3</option><option value="10010642">AS-350B/350BA</option><option value="2010253">AS-350BA</option><option value="14010642">AS-350D</option><option value="15010642">AS-355F-1/355F-2</option><option value="16010642">AS-365N-1</option><option value="68010642">AW 119 KOALA</option><option value="69010642">AW 139</option><option value="52010642">BK 117</option><option value="51010642">BO 105CBS</option><option value="44010642">BV-107</option><option value="45010642">BV-234</option><option value="63010642">CH 53D</option><option value="64010642">CH 54/S 64</option><option value="71010642">EC 130-B4</option><option value="72010642">EC 145</option><option value="73010642">EC 155B1</option><option value="74010642">EC 225</option><option value="17010642">EC-120</option><option value="18010642">EC-135</option><option value="70010642">EH 101</option><option value="47010642">H-1100B</option><option value="49010642">H43-F</option><option value="78010642">K-1200</option><option value="59010642">S-55T</option><option value="60010642">S-58D/E</option><option value="61010642">S-58T/PT6T-3</option><option value="62010642">S-58T/PT6T-6</option><option value="65010642">S-61N</option><option value="66010642">S-62A</option><option value="67010642">S-70</option><option value="79010642">S-76C+</option><option value="80010642">S-92</option><option value="3010642">SA-315B</option><option value="4010642">SA-316B</option><option value="5010642">SA-318C</option><option value="6010642">SA-319B</option><option value="8010642">SA-341G</option><option value="26010642">TH-1L</option><option value="48010642">UH-12/SOLO</option><option value="24010642">UH-1B</option><option value="75010642">UH-1B Super</option><option value="25010642">UH-1F</option><option value="76010642">UH-1H (13 engine)</option><option value="77010642">UH-1H (17 engine)</option></select></div></div><h4>Base</h4><table class="table table-bordered table-striped table-condensed lineRatesTable"><thead><tr class="lineRateHeader"><th>Rate</th><th>Price Per Unit</th><th>Rate Start Date</th><th>Rate End Date</th></tr></thead><tbody></tbody></table><div class="row addRateFormFields"><div class="cell"><label for="baseRate">Rate</label><select id="baseRate" name="baseRate"><option value="">Select Rate</option><OPTION selected value="">Select Rate</OPTION><OPTION value=2010643>FT - Flight Rate with Govt Pilot</OPTION><OPTION value=7010643>AV - Availability Rate</OPTION><OPTION value=13010643>FT - Specified Flight Rate</OPTION><OPTION value=14010643>FT - Flight Rate Dry</OPTION><OPTION value=15010643>FT - Project Rate</OPTION><OPTION value=23010643>AV - Half-Day Availability Rate</OPTION></select></div><div class="cell"><label for="basePricePerUnit">Price Per Unit</label><input type="text" id="basePricePerUnit" name=""></div><div class="cell"><label for="baseRateStart">Rate Start:</label><input type="text" id="baseRateStart" name=""></div><div class="cell"><label for="baseRateEnd">Rate End:</label><input type="text" id="baseRateEnd" name=""></div><div class="cell"><button class="AddOptionRateButton btn btn-primary btn-small"><i class="icon icon-plus-sign icon-white"></i> Add</button></div></div><div class="row"><div class="cell"><button class="btn btn-small addaratebtn" id="baseaddratebtn"><i class="icon icon-plus-sign"></i> add a rate</button></div></div>');
			for(i=1; i<years; i++){
				$('#tailNumModalForm .modal-body').append('<h4>Option '+i+'</h4><table class="table table-bordered table-striped table-condensed lineRatesTable"><thead><tr class="lineRateHeader"><th>Rate</th><th>Price Per Unit</th><th>Rate Start Date</th><th>Rate End Date</th></tr></thead><tbody></tbody></table><div class="row addRateFormFields"><div class="cell"><label for="option'+i+'Rate">Rate</label><select id="option'+i+'Rate" name="option'+i+'Rate"><option value="">Select Rate</option><OPTION selected value="">Select Rate</OPTION><OPTION value=2010643>FT - Flight Rate with Govt Pilot</OPTION><OPTION value=7010643>AV - Availability Rate</OPTION><OPTION value=13010643>FT - Specified Flight Rate</OPTION><OPTION value=14010643>FT - Flight Rate Dry</OPTION><OPTION value=15010643>FT - Project Rate</OPTION><OPTION value=23010643>AV - Half-Day Availability Rate</OPTION></select></div><div class="cell"><label for="option'+i+'PricePerUnit">Price Per Unit</label><input type="text" id="option'+i+'PricePerUnit" name=""></div><div class="cell"><label for="option'+i+'RateStart">Rate Start:</label><input type="text" id="option'+i+'RateStart" name="" value="'+$('#option'+i+' .segmentdate').text()+'"></div><div class="cell"><label for="option'+i+'RateEnd">Rate End:</label><input type="text" id="option'+i+'RateEnd" value="'+$('#option'+i+' .segmentenddate').text()+'"></div><div class="cell"><button class="AddOptionRateButton btn btn-primary btn-small"><i class="icon icon-plus-sign icon-white"></i> Add</button></div></div><div class="row"><div class="cell"><button class="btn btn-small addaratebtn"><i class="icon icon-plus-sign"></i> add a rate</button></div></div>');
			}

			$('#baseRateStart').val($('#contractStartDate').val());
			$('#baseRateEnd').val($('#baseEndDate').val());

			for(i=1; i<=years; i++){

			}


			$('.addaratebtn').click(function(){
				var that = this;
				if($('.addRateFormFields:visible').length > 0){
					$('.addRateFormFields:visible').removeClass('open').slideUp('fast',function(){
						$(that).parent().parent('.row').prev('.addRateFormFields').slideDown('slow',function(){
							$(this).addClass('open');
						});
					})
				} else {
					$(that).parent().parent('.row').prev('.addRateFormFields').slideDown('slow',function(){
							$(this).addClass('open');
						});

				}
			});

			$('.AddOptionRateButton').click(function(){
				if($(this).hasClass('disabled')){
					return false;
				} else {
					sb.notify({
						type: "add-line-rate",
						data: null
					});
				}
			});

			sb.notify({
				type: 'option-set-finished',
				data: null
			})

		}