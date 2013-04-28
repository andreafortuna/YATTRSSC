YATTRSSC - Yet Another Tiny Tiny RSS Client
===========================================

Simple client for accessing instances of Tiny Tiny RSS (http://tt-rss.org/). 
Allows you to read and manage your feeds, add tags and sharing posts on Facebook and Twitter. 

 * HTTPS TT-RS instances: on iOS any ajax request fail. 
    A simple workaround: add at the end of AppDelegate.m this code
    `````
    @implementation NSURLRequest(DataController)
    
    + (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host
    
    {
    
        return YES;
        
        }
        
    @end    
`````

on Android, first create a new class:
`````
import org.apache.cordova.CordovaWebViewClient;
import org.apache.cordova.DroidGap;
import android.net.http.SslError;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
public class SSLAcceptingWebViewClient extends CordovaWebViewClient {
    public SSLAcceptingWebViewClient(DroidGap ctx) {
        super(ctx);
    }
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        handler.proceed();
    }
}
`````

then change ths main activity:

`````
 super.onCreate(savedInstanceState);        
 super.init();
 CordovaWebViewClient webViewClient = new SSLAcceptingWebViewClient(this);
 webViewClient.setWebView(this.appView);
 this.appView.setWebViewClient(webViewClient);
 super.loadUrl(Config.getStartUrl());        
`````