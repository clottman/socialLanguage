	var self = this;
	self.posts = new Array(10);
$(function () {

$.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: config.fb.appId,
    });     
   // $('#loginbutton,#feedbutton').removeAttr('disabled');
  //  FB.getLoginStatus(updateStatusCallback);
  
  });
$("#login").click(testFunction);


});


function testFunction() {
	FB.login(function(response) {
		if (response.authResponse) 
		{
			FB.api('/me', function(response) {
				console.log('Hiya, ' + response.name + '.');
			});

			FB.api('/me?fields=posts.limit(10)', function(response) {extractMessages(response.posts.data); });
		}
		else 
		{
			console.log("Well that could have went better");
		}
	}, {scope: 'read_stream'});
};

function extractMessages(data) {
	for (i=0; i<data.length; i++) {
		self.posts[i] = data[i].message;
		console.log(self.posts[i]);
	}
}

String.prototype.parseURL = function () {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (url) {
		return url.link(url);
	});
};
String.prototype.parseUsername = function () {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
		var username = u.replace("@", "")
		return u.link("http://twitter.com/" + username);
	});
};
String.prototype.parseHashtag = function () {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
		var tag = t.replace("#", "%23")
		return t.link("http://search.twitter.com/search?q=" + tag);
	});
};
String.prototype.format = function () {
	var s = this,
        i = arguments.length;
	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}
	return s;
};