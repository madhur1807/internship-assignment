window.onload = ()=>{
	window.itemArray = [];
	getItemArray();
	displayActive();
	var list = document.querySelector('ul');
	list.addEventListener('click', (ev) =>{
  		if (ev.target.tagName === 'INPUT') {
    		ev.target.parentElement.classList.toggle('checked');
    		displayActive();
  		}
	});
	var input = document.getElementById("mainTxt");
	input.addEventListener("keyup", function(event) {
    	event.preventDefault();
    	if (event.keyCode === 13) {
        	newElement();
    	}
	});
	window.setCount = false; // is used when there are no todo items
};

function getItemArray(){
	document.getElementById("myUL").innerHTML = "";
	var item_array = localStorage.getItem("items_list");
	if(item_array != null && item_array.length > 2){
		var list_array = JSON.parse(item_array);
		var len = list_array.length;
		for(let i=0; i<len; i++){
			var li = document.createElement("li");
			// add checkbox to li
			var newCheckBox = document.createElement('input');
    		newCheckBox.type = 'checkbox';
			li.appendChild(newCheckBox);

			//add todo item to li
			var span = document.createElement("SPAN");
			var txt = document.createTextNode(list_array[i]);
			span.appendChild(txt);
			li.appendChild(span);
			
			// add close button to li
			var span = document.createElement("SPAN");
			span.setAttribute("onclick", "deleteItem(this)")
			var txt = document.createTextNode("\u00D7");
			span.className = "close";
			span.appendChild(txt);
			li.appendChild(span);

			// add edit button to li
 			var span2=document.createElement("SPAN");
			var txt2 = document.createTextNode("Edit");
			span2.setAttribute("onclick", "editItem(this)")
			span2.className = "edit";
			span2.appendChild(txt2);
			li.appendChild(span2);

			// append li to ul
			var ul = document.getElementById("myUL");
			ul.appendChild(li); 
		}
	}else {
		var li = document.createElement("li");
		li.setAttribute("disabled", "true"); 
		li.innerHTML = "No task added to todo list yet!";
		var ul = document.getElementById("myUL");
		ul.appendChild(li); 
		window.setCount = true;
	}
}

function newElement(){
	var newTodoItem = document.getElementById("mainTxt").value;
	if(newTodoItem == null || newTodoItem == ""){
		alert("Please enter a todo item and then hit enter");
		return;
	}
	var array = localStorage.getItem("items_list");
	if(array != null){
		var old_array = JSON.parse(array);
		old_array.push(newTodoItem);
		localStorage.setItem("items_list", JSON.stringify(old_array));
	} else{
		window.itemArray.push(newTodoItem);
		localStorage.setItem("items_list", JSON.stringify(window.itemArray));
	}	
	document.getElementById("mainTxt").value = "";
	getItemArray();
	displayActive();
}

function displayActive(){
	var number = document.getElementById("myUL").getElementsByTagName("li");
	var checked = 0;
	var unchecked = 0;
	for(let i=0; i<number.length; i++){		
		if(number[i].classList.contains("checked")){
			checked++;
		} else{
			unchecked++;
		}
	}
	if(window.setCount){
		unchecked = 0;
	}
	var span1 = document.getElementById("status1");
	status1.innerHTML = `No of completed todo items : ${checked}`;
	var span2 = document.getElementById("status2");
	status2.innerHTML = `No of pending todo items : ${unchecked}`;
}

function deleteItem(self){
	var positionOfItem;
	var target_li = self.parentElement;
	var target_span = target_li.getElementsByTagName("span");
	var item_name = target_span[0].innerHTML;
	var item_array = JSON.parse(localStorage.getItem("items_list"));
	item_array.forEach(v =>{
		if(v == item_name){
			positionOfItem = item_array.indexOf(v);
		}
	});
	item_array.splice(positionOfItem,1);
	localStorage.setItem("items_list", JSON.stringify(item_array));
	getItemArray();
	displayActive();
}

function editItem(self){
	var target_li = self.parentElement;
	var target_span = target_li.getElementsByTagName("span");
	var item_name = target_span[0].innerHTML;
	document.getElementById("editTxt").value = item_name;
	var edit_box = document.getElementById('editTopic');
    edit_box.style.display = "block";
    var item_array = JSON.parse(localStorage.getItem("items_list"));
    item_array.forEach(v=>{
    	if(v == item_name){
    		window.positon = item_array.indexOf(v);
    	}
    });
}

function cancelEdit(){
 	var edit_box = document.getElementById('editTopic');
	edit_box.style.display = "none";
}

function editText(){
	var edit_item = document.getElementById("editTxt").value;
	if(edit_item != ""){
		var item_array = JSON.parse(localStorage.getItem("items_list"));
		item_array[window.positon] = edit_item;
		localStorage.setItem("items_list", JSON.stringify(item_array));
		var edit_box = document.getElementById('editTopic');
		edit_box.style.display = "none";
		getItemArray();
		displayActive();
	} else{
		alert("Please enter new value!");
	}
}