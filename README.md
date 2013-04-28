YATTRSSC - Yet Another Tiny Tiny RSS Client
===========================================

Simple client for accessing instances of Tiny Tiny RSS (http://tt-rss.org/). 
Allows you to read and manage your feeds, add tags and sharing posts on Facebook and Twitter. 

 * HTTPS TT-RS instances: on iOS any ajax request fail. 
    A simple workaround: add at the end of AppDelegate.m this code
    
    @implementation NSURLRequest(DataController)
    + (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host
    {
        return YES;
        }
    @end
