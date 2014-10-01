Livefyre.require([
			    'streamhub-wall#3','streamhub-sdk#2','stream#0.2.2'],
			function (LiveMediaWall,SDK,Stream) {
				var collection = new SDK.Collection({
				    "articleId": "13", 
				    "siteId": 333682, 
				    "network": "client-solutions.fyre.co"
				});
			   
			    var wall = window.wall = new LiveMediaWall({
			        el: document.getElementById("wall"),
			        postButton: true
			    });

			    function itemsWithImages(){
			        var customTransform = new Stream.Transform({});
			        customTransform._transform = function(content, done){
			            if (content.attachments.length == 0){
			                done();
			            }else{
			                //TODO: attachment might be in array item > 0      
			                if (content.attachments[0].type === "photo" || content.attachments[0].type === "video"){
			                        return done(null, content);
			                }
			                done();
			            }
			    
			        };
			        return customTransform;
			    };

			    collection.createUpdater().pipe(itemsWithImages()).pipe(wall);
			    collection.createArchive().pipe(itemsWithImages()).pipe(wall.more);
			});