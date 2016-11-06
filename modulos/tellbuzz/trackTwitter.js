module.exports = function(tw, socket)
{
		
	tw.track('@veja');
	tw.track('@exame');
	tw.on('tweet', function(tweet){
		socket.emit('buzz', tweet);
	});
	
}