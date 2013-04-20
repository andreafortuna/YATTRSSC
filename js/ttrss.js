
/** FUNZIONI TTRSS **/

function login(url, user, password) {
    var session_id= "";

    function showAlert (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
    
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
              if (data.status == "1") {
             if (localStorage.URL != "" && localStorage.URL !=  undefined) showAlert("Error:" + data.content.error, "YATTRSSC");
                session_id="";
              } else {
                session_id = data.content.session_id;
              }
          },
          error: function()
          {
            if (localStorage.URL!= "" && localStorage.URL != undefined)  { 
                showAlert("Host unreachable:" + url + "\nPlease Check Network","YATTRSSC");
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
              categorie= data.content;
          },
          error: function()
          {

          }
      });
    return categorie;
}

function getCategoriesA(url, session_id, funzione) {
    //var categorie = "";
    var data = {
        op: "getCategories",
        sid: session_id,
        unread_only:false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content);
          },
          error: function()
          {
           
          }
      });
}



function getLabels(url, session_id) {
    var labels = "";
    var data = {
        op: "getLabels",
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
              labels= data.content;
          },
          error: function()
          {
          }
      });
    return labels;
}


function getLabelsA(url, session_id, funzione) {
    
    var data = {
        op: "getLabels",
        sid: session_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content);
          },
          error: function()
          {
          }
      });
    
}



function removeArticleLabels(url, session_id, article_id) {
    var labels = "";
    var data = {
        op: "getLabels",
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
                $.each(data.content, function() {
                    removeLabel(url, session_id,article_id,this.id);
                });
          },
          error: function()
          {
          }
      });
    return labels;
}


function removeArticleLabelsA(url, session_id, article_id, funzione) {
    var labels = "";
    var data = {
        op: "getLabels",
        sid: session_id,
        article_id: article_id
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
                $.each(data.content, function() {
                    removeLabelA(url, session_id,article_id,this.id, function(){});
                });
                funzione();
          },
          error: function()
          {
          }
      });
    return labels;
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
              feeds= data.content;
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return feeds;
}


function getFeedsA(url, session_id, cat_id, funzione) {
    var feeds = "";
    var data = {
        op: "getFeeds",
        sid: session_id,
        cat_id: cat_id,
        unread_only: localStorage.unread,
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
          async:true,
          success: function(data)
          {
              funzione(data.content);
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
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
        view_mode: "all_articles",
        include_attachments:false,
        since_id:0,
        limit: 30,
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
          cache:true,
          timeout:5000,
          success: function(data)
          {
              articles= data.content;
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return articles;
}


function getArticlesA(url, session_id, feed_id, funzione) {
    var v_mode = "" 
    
    if (localStorage.unread=="true") {
        v_mode="unread";
    } else {
        v_mode="all_articles";
    }
    
    var data = {
        op: "getHeadlines",
        sid: session_id,
        feed_id: feed_id,
        is_cat:false,
        show_excerpt:true,
        show_content:false,
        view_mode: v_mode  ,
        include_attachments:false,
        since_id:0,
        limit: 30,
        skip: 0,
        include_nested: false
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content);
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
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
                $.each(data.content, function() {
                    article= this;
                });
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}


function getArticleA(url, session_id, article_id, funzione) {
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
          async:true,
          success: function(data)
          {
                $.each(data.content, function() {
                    funzione (this);
                });
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}



function setRead(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:0,
        field:2
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
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}

function setReadA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione();
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}

function setAllReadA(url, session_id, feed_id, funzione) {
    var article = "";
    var data = {
        op: "catchupFeed",
        sid: session_id,
        feed_id: feed_id,
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content.status);
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}




function setLabel(url, session_id, article_id, label_id) {
    var article = "";
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:true,
        mode:0,
        field:2
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
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}

function setLabelA(url, session_id, article_id, label_id, funzione) {
    
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:true,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione();
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}


function removeLabel(url, session_id, article_id, label_id) {
    var article = "";
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:false,
        mode:0,
        field:2
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
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network");
          }
      });
    return article;
}

function removeLabelA(url, session_id, article_id, label_id, funzione) {
    var data = {
        op: "setArticleLabel",
        sid: session_id,
        article_ids: article_id,
        label_id: label_id,
        assign:false,
        mode:0,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione();
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });

}


function setUnRead(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:2
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
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}

function setUnReadA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:2
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione();
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}


function addStar(url, session_id, article_id) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:0
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
            
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}

function addStarA(url, session_id, article_id, funzione) {
    var article = "";
    var data = {
        op: "updateArticle",
        sid: session_id,
        article_ids: article_id,
        mode:1,
        field:0
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione();
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return article;
}



function subscribe(url, session_id, feedurl, categoryID) {
    var esito = "";
    var data = {
        op: "subscribeToFeed",
        sid: session_id,
        feed_url: feedurl,
        category_id:categoryID
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
              esito = data.content.status;

          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return esito;
}

function subscribeA(url, session_id, feedurl, categoryID, funzione) {
    var esito = "";
    var data = {
        op: "subscribeToFeed",
        sid: session_id,
        feed_url: feedurl,
        category_id:categoryID
    };
            
      $.ajax({
          type: "POST",
          url: url + "/api/",
          contentType: "application/json",
          data: JSON.stringify(data),
          dataType: "json",
          async:true,
          success: function(data)
          {
              funzione(data.content.status);
          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return esito;
}

//feed_id
function unSubscribe(url, session_id, feed_id) {
    var esito = "";
    var data = {
        op: "unsubscribeFeed",
        sid: session_id,
        feed_id: feed_id
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
              esito = data.content.status;

          },
          error: function()
          {
            showAlert("Network Error, Please Check Network","YATTRSSC");
          }
      });
    return esito;
}
