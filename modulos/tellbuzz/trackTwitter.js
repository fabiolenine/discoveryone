module.exports = function(tw, io)
{
		
	tw.track('veja');
	tw.track('lava-jato');
	tw.on('tweet', function(tweet){
	  io.emit('tweet', tweet);
	});
	
}