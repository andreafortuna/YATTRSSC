document.addEventListener("deviceready", global_pageinit);
$("#MainPage").live('pageinit', global_pageinit);



function global_pageinit() {
	$.mobile.allowCrossDomainPages = true;
	
	var version = "0.0.1 Beta",
	foothtml = "Versione " + version,
	cright = "&copy; 2012 Andrea Fortuna";


	$( ".type-home .ui-content p.jqm-version" ).html( version );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
	$( ".footer-docs p.af-copyright" ).html( cright );
	
	
	local_pageinit();
	
}
