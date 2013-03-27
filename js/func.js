document.addEventListener("deviceready", global_pageinit);
//$("#MainPage").live('pageinit', global_pageinit);



function global_pageinit() {
	$.mobile.allowCrossDomainPages = true;
	
	var version = "0.0.1 Beta",
	foothtml = "Versione " + version,
	cright = "&copy; 2013 Andrea Fortuna";


	$( ".type-home .ui-content p.jqm-version" ).html( version );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
	$( ".footer-docs p.af-copyright" ).html( cright );
	
	
	local_pageinit();
	
}


function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     //var sec = a.getSeconds();
     var time = date+','+month+' '+year+' '+hour+':'+min ;
     return time;
 }

