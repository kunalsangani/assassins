var text = 'Alonzo-Estrada	Jaysha	jayshaa@stanford.edu	+18083332613\t\n' + 
'Blake	Ray	rayblake@stanford.edu	+14084764526\t\n' + 
'Blake	Shoney	shoneyblake@stanford.edu	+14052099206\t\n' + 
'Bovee	Griffin	gbovee@stanford.edu	+19162248577\t\n' + 
'Broad	Nicholas	nbroad@stanford.edu	+14085020208\t\n' + 
'Buenaflor	John Carlo	jcbuena@stanford.edu	+12138189173029\t\n' + 
'Chen	Hannah	hkchen5@stanford.edu	+15108251627\t\n' + 
'Chen	Ray	juikang@stanford.edu	+14088960990\t\n' + 
'Clark	Josiah	josiahc@stanford.edu	+18088964250\t\n' + 
'Coleman	Emma	ecolema2@stanford.edu	+17736201702\t\n' + 
'DeCastro	Allison	agd16@stanford.edu	+1425444-2624\t\n' + 
'Eggers	Jessica	jeggers3@stanford.edu	+14066000797\t\n' + 
'Garcia	Rebekah	ragarcia@stanford.edu	+15625065277\t\n' + 
'Gladstone	Lauve	laglad@stanford.edu	+17035776582\t\n' + 
'Godbole	Poorwa	pgodbole@stanford.edu	+17245185699\t\n' + 
'Grant	Eva	evagrant@stanford.edu	+12508184811\t\n' + 
'Hatathlie	Kenaba	kenaba@stanford.edu	+15052155808\t\n' + 
'Hattori	Matthew	mhattori@stanford.edu	+14084064282\t\n' + 
'Karrfelt	Filippa	filippak@stanford.edu	+16509337247\t\n' + 
'Kehoe	Emmie	emkehoe@stanford.edu	+12069141681\t\n' + 
'Lee	Andrew	alee16@stanford.edu	+13154163102\t\n' + 
'Leonard	Shane	shanel@stanford.edu	+17192012530\t\n' + 
'Lucio	Scott	slucio@stanford.edu	+15307613324\t\n' + 
'McKown	Katelyn	kmckown@stanford.edu	+16268082615\t\n' + 
'Militante	Jessie	jmilitan@stanford.edu	+14088216343\t\n' + 
'Robinson	Sarah	srobins2@stanford.edu	+16508158840\t\n' + 
'Rodriguez	Irving	irod973@stanford.edu	+17085594040\t\n' + 
'Ruiz	John	johnruiz@stanford.edu	+19738519125\t\n' + 
'Salonga	Edward	esalonga@stanford.edu	+16504683772\t\n' + 
'Sangani	Kunal	ksangani@stanford.edu	+13153825338\t\n' + 
'Smith	Carson	csmith97@stanford.edu	+17082184704\t\n' + 
'Tobacco	Jan	january@stanford.edu	+16058992513\t\n' + 
'Troderman	Joe	jtrod93@stanford.edu	+17816368261\t\n' + 
'Wedekind	Lauren	laurene1@stanford.edu	+13108096155\t\n' + 
'Whitfield	Emery	emerynez@stanford.edu	+15055040084\t\n' + 
'Wright	Lena	tseabbe2@stanford.edu	+17757414042\t\n';

var count = 0;

while(text.length > 0) {
	var ind_newline = text.indexOf('\n');
	var line = text.substring(0, ind_newline);
	text = text.substring(ind_newline + 1);
	console.log('var player_' + count + ' = {');
	console.log('\tfirst_name: \'' + line.substring(0, line.indexOf('\t')) + '\',');
	line = line.substring(line.indexOf('\t') + 1);
	console.log('\tlast_name: \'' + line.substring(0, line.indexOf('\t')) + '\',');
	line = line.substring(line.indexOf('\t') + 1);
	console.log('\temail: \'' + line.substring(0, line.indexOf('\t')) + '\',');
	line = line.substring(line.indexOf('\t') + 1);
	console.log('\tphone: \'' + line.substring(0, line.indexOf('\t')) + '\',');
	console.log('\talive: true');
	console.log('};')
	count++;
}