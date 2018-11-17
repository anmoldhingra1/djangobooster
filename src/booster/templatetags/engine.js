var loaded_elements = []
var all_links

document.addEventListener('DOMContentLoaded', function(){
	all_links = document.getElementsByTagName('a')
	for (var i=0;i<all_links.length;i++){
	console.log(i)
		all_links[i].dataset = null
		all_links[i].addEventListener("mouseover", function(){
		console.log('1');
			getResults(this);

		})
	}

	for (var i=0;i<all_links.length;i++){
	all_links[i].addEventListener("onclick",function(){
		if (this.dataset){
			var newDoc = document.open("text/html", "replace");
			newDoc.write(this.dataset);
			newDoc.close();
		}
		else {
			window.location = element.href
		}

	for (i in loaded_elements){
		loaded_elements[i].dataset = ""
	}
	loaded_elements = []

	})
}


}, false);




function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}


function getResults(element){

	console.log('2');
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	console.log('yes');
	console.log(this.responseText)
	      element.dataset = this.responseText;
	    }

	console.log('3');
	}

	console.log('4');
	xhttp.open("GET", element.href, true);
	xhttp.send(); 
	loaded_elements.push(element)
}