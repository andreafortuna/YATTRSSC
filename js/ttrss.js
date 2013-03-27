
/** FUNZIONI TTRSS **/

function login(url, user, password) {
    var session_id= "";
    
    
var data = {
        op: "login",
        user: user,
        password: password
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content.session_id);
              if (data.status == "1") {
            if (localStorage.URL!="" || localStorage.URL!="undefined") alert("Errore di accesso:" + data.content.error)
                session_id="";
              } else {
                session_id = data.content.session_id;
              }
          },
          error: function()
          {
            if (localStorage.URL!="" || localStorage.URL!="undefined")  { 
                alert("Host non raggiungibile:" + url);
            } else {
                $.mobile.changePage("account.html");
            }
            
          }
      });
    return session_id;
}


function getCategories(url, session_id) {
    var categorie = "";
    var data = {
        op: "getCategories",
        sid: session_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              categorie= data.content;
                // $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                //});
          },
          error: function()
          {
            //alert("Errore di rete");
          }
      });
    return categorie;
}

function getFeeds(url, session_id, cat_id) {
    var feeds = "";
    var data = {
        op: "getFeeds",
        sid: session_id,
        cat_id: cat_id,
        unread_only: false,
        limit: 0,
        offset: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              feeds= data.content;
                /* $.each(data.content, function() {
                    alert(this.id + " " + this.title);
                });*/
          },
          error: function()
          {
            alert("Errore di rete");
          }
      });
    return feeds;
}


function getArticles(url, session_id, feed_id) {
    var articles = "";
    var data = {
        op: "getHeadlines",
        sid: session_id,
        feed_id: feed_id,
        is_cat:false,
        show_excerpt:true,
        show_content:false,
        view_mode: "unread",
        include_attachments:false,
        since_id:0,
        limit: 0,
        skip: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content.error);
              articles= data.content;
                 //$.each(data.content, function() {
                //    alert(this.id + " " + this.title);
                //});
          },
          error: function()
          {
            alert("Errore di rete");
          }
      });
    return articles;
}


function getArticle(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "getArticle",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:false,
          success: function(data)
          {
            //$("#risultato").html(msg);
              //alert( data.content);
              //article= data.content;
                $.each(data.content, function() {
                    //alert(this.id + " " + this.title);
                    article= this;
                });
          },
          error: function()
          {
            alert("Errore di rete");
          }
      });
    return article;
}

