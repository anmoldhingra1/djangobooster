var loaded_elements = []

all_links = document.getElementsByTagName('a')
for (i in all_links){
	all_links[i].dataset.html = null
	all_links[i].onmouseover(function(){
		getResults(this);

	})
}

function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}


function getResults(element){
	xhttp.onreadystatechange = function() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      element.dataset.html = this.responseText;
	    }
	}

	xhttp.open("GET", "get_pages"+ formatParams({'page': element.attr('href')}), true);
	xhttp.send(); 
	loaded_elements.push(element)
}}

for (i in all_links){
	all_links[i].onclick(function(){
		if (this.dataset.html){
			var newDoc = document.open("text/html", "replace");
			newDoc.write(this.dataset.html);
			newDoc.close();
		}
		else {
			window.location = element.attr('href')
		}

	for (i in loaded_elements){
		loaded_elements[i].dataset.html = ""
	}
	loaded_elements = []

	})
}