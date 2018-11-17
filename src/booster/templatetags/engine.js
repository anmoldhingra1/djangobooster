
var e,p;
var 
all_links = document.getElementsByTagName('a')
for (i in all_links){
	all_links[i].onmouseover(function(){

		e = $(this);
		console.log('3')
		getResults();

	})
}
function getResults(){
	xhttp.onreadystatechange = function() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      html_data = this.responseText;
	    }
	}


	$.get('get_pages', {page: e.attr('href')}, function(data){
		console.log('1')
		html_data = data
	
});