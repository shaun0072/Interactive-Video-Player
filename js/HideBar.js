$(".media-container").hover(function(event) {
    if(event.type === "mouseenter") {
		console.log('Mouse In');
        $('#buttonbar').attr('style', 'visibility:visible;');
		$('#progress').attr('style', 'margin-bottom:0;');
    } else if(event.type === "mouseleave") {
		console.log('Mouse Out');
        $('#buttonbar').attr('style', 'visibility:hidden;transition:visibility 1.2s;');
		$('#progress').attr('style', 'margin-bottom:-58px;transition:margin-bottom .3s 1.2s;');
    }
});