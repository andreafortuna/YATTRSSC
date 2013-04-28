document.addEventListener("deviceready", global_pageinit);
$("#MainPage").live('pageinit', global_pageinit);




function global_pageinit() {
	$.mobile.allowCrossDomainPages = true;
	$.mobile.buttonMarkup.hoverDelay = 0;
    
    
	var version = "0.0.3 Beta",
	foothtml = "Version " + version,
	cright = "&copy; 2013 Andrea Fortuna";
    
    
	$( ".type-home .ui-content p.jqm-version" ).html( version );
	$( ".footer-docs p.jqm-version" ).html( foothtml );
	$( ".footer-docs p.af-copyright" ).html( cright );
    
    if (typeof localStorage.unread === "undefined") localStorage.unread=false;
	
}


function toast(message) {
    $("<div  style='background-color: white' class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h4 style='margin:5px;padding:10px;'>" + message + "</h4></div>").css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 300 ,"left":"30%"}).appendTo( $.mobile.pageContainer ).delay(1500).fadeOut( 400, function(){$(this).remove();});
}


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp*1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date+','+month+' '+year+' '+hour+':'+min ;
    return time;
}



function caricaCategorie() {
    
    $.mobile.loading('show', {text:"Updating..."});
    
    sessionStorage.URL = localStorage.URL;
    
    sessionStorage.session_id=login(sessionStorage.URL,localStorage.Username,localStorage.Password);
    
    if (sessionStorage.session_id=="" || sessionStorage.session_id==undefined) {
        $.mobile.changePage("account.html", null, true, true);
    }
    
    
    getCategoriesA(sessionStorage.URL, sessionStorage.session_id, function(categorie) {
                   var list = $('#categorieListView');
                   //Svuoto categorie
                   list.empty();
                   list.append("<li data-theme='b'><a href='#'>Categories</a> <a href='#' onclick='caricaCategorie();'>refresh</a></li>");
                   $.each(categorie, function() {                          
                          list.append("<li><a data-transition=\"slide\" href='feeds.html'  onclick=\"sessionStorage.catID='" + this.id + "';sessionStorage.catTitle='" + this.title + "'\">" + this.title + "</h4></a><span class=\"ui-li-count\">" + this.unread + "</span></li>");                          
                          });
                   list.listview("refresh");
                   $.mobile.loading('hide');
                   });
    
}

function caricaFeeds() {
    $.mobile.loading('show', {text:"Updating..."});
    var list = $('#feedsListView');
    list.empty();
    getFeedsA(sessionStorage.URL, sessionStorage.session_id, sessionStorage.catID, function(feeds) {
              $.each(feeds, function() {
                    var feedtitle = this.title.replace(/\'/g,"\\\'");
                  if (this.id != "")  list.append("<li><a data-transition=\"slide\" href='dettaglio.html'  onclick=\"sessionStorage.feedID='" + this.id + "';sessionStorage.feedTitle='" + feedtitle + "'\">" + this.title + "</h4></a><span class=\"ui-li-count\">" + this.unread + "</span></li>");
                     });
              list.listview("refresh");
              $.mobile.loading('hide');
              });
}



function caricaArticoli(loader) {
    var precedente=0;
    var successivo=0;
    
    if (loader != "0") $.mobile.loading('show', {text:"Updating..."});
    $('#dettaglioTitoloFeed').text(sessionStorage.feedTitle);
    var list = $('#articlesListView');
    list.empty();
    getArticlesA(sessionStorage.URL, sessionStorage.session_id, sessionStorage.feedID, function(articles) {
                 $.each(articles, function() {
                        sessionStorage.AllArticles = JSON.stringify(articles);
                        if (this.id != "") {
                            list.append("<li id='" + this.id + "'>  <a data-transition=\"flip\" style='white-space : normal;" + ((this.unread === true) ?  "font-style:normal;": "font-size:0.8em;color:#888") + "' href='articolo.html' onclick=\"sessionStorage.articleID='" + this.id + "'\">" + this.title + "<p style='margin:5px;'>" + timeConverter(this.updated) + "</p></a></li>");
                        }
                        });
                     list.listview("refresh");
                    $.mobile.loading('hide');
                 });
}

function caricaArticolo() {
}