module.exports = function(tw, socket)
{
		
	tw.track('@veja');
	tw.track('@exame');
	tw.track('@ibmbrasil');
	tw.track('@srlm');
	tw.on('tweet', function(tweet){
		socket.emit('buzz', tweet);
	});
	
}