var array_size = 1000
var loaded_elements = []
var all_links
var mouse_location = []
var freezed_mouse_location = []
var counter = 0
var register_window = 1
var scroll_data = []
var init_scroll = null

onmousemove = function(e){ 
		counter+=1;
		if (counter<register_window) return;
		counter = 0;
		mouse_location.push([e.clientX, e.clientY]);
		console.log(mouse_location.length)

		if( scroll_data.length ==0){
			if (init_scroll){
				scroll_data.push([document.documentElement.scrollHeight-init_scroll[0],
								document.documentElement.scrollWidth-init_scroll[1]])
			}
			else{
				init_scroll = [document.documentElement.scrollHeight,document.documentElement.scrollWidth]}
		}

		if(mouse_location.length>array_size){
			mouse_location.shift()
			scroll_data.shift()

		}


		if (mouse_location.length<2) return
		predict_and_load()

				}

function predict_and_load(){
	document_height = document.documentElement.clientHeight
	document_width = document.documentElement.clientWidth
	predict_mouse_history = mouse_location.map(a => Object.assign({}, a));
	len_mou = predict_mouse_history.length

	for (var i=0;i<predict_mouse_history.length;i++){
		predict_mouse_history[i][0]/=document_width
		predict_mouse_history[i][1]/=document_height
	}

	for (var i=0;i<all_links.length;i++){
		element = all_links[i]
		elpos = getPosition(all_links[i])
		el_width  = element.clientWidth/document_width
		el_height = element.clientHeight/document_height
		relative_pos = [(elpos.x)/document_width-predict_mouse_history[len_mou-1][0],
						(elpos.y)/document_height-predict_mouse_history[len_mou-1][1]]
		if(i==1){
			console.log((predict_mouse_history[len_mou-1][0]-predict_mouse_history[len_mou-2][0])*Math.sign(relative_pos[0])>=0,
				(predict_mouse_history[len_mou-1][1]-predict_mouse_history[len_mou-2][1])*Math.sign(relative_pos[1])>=0,
				Math.abs(relative_pos[0]), Math.abs(relative_pos[1]))
		}
		//temporary code follows for prediction
		if (Math.abs(relative_pos[0])<0.05 && Math.abs(relative_pos[1])<0.05){
			if ((predict_mouse_history[len_mou-1][0]-predict_mouse_history[len_mou-2][0])*Math.sign(relative_pos[0])>=0 &&
				(predict_mouse_history[len_mou-1][1]-predict_mouse_history[len_mou-2][1])*Math.sign(relative_pos[1])>=0
				){
				console.log('predicting')
				getResults(all_links[i])
			}
		}
		
	}

}
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function post_training_data(element){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {}
	elpos = getPosition(element)
	document_height = document.documentElement.clientHeight
	document_width = document.documentElement.clientWidth

	for (var i=0;i<freezed_mouse_location.length;i++){
		freezed_mouse_location[i][0]/=document_width
		freezed_mouse_location[i][1]/=document_height
	}

	xhttp.open("GET", 'booster/training_data'+formatParams({'mouse_history':freezed_mouse_location.toString(),
					   'relative_pos':[elpos.x/document_width-freezed_mouse_location[0],
					   					elpos.y/document_height-freezed_mouse_location[1]].toString(),
					   'width':(element.clientWidth/document_width).toString(),
						'height':(element.clientHeight/document_height).toString(),
						'document_dim': [document_height,document_width].toString(),
						'scroll_data':scroll_data.toString()}), true);
	xhttp.send(); 
}

document.addEventListener('DOMContentLoaded', function(){
	all_links = document.getElementsByTagName('a')
	


	for (var i=0;i<all_links.length;i++){
	all_links[i].addEventListener("onclick",function(){
		freezed_mouse_location = mouse_location.map(a => Object.assign({}, a));
		post_training_data(this)
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