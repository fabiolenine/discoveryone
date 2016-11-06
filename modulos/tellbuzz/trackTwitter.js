module.exports = function(tw, io)
{
		
	tw.track('veja');
	tw.track('lava-jato');
	tw.on('tweet', function(tweet){
		console.log(tweet);
		io.emit('tweet', tweet);
	});
	
}