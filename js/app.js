/**
* @description this function is Take an id of element then smoothscroll to it
* @param {string} an ID of an element
*/
function smoothScroll(id){
	section = document.querySelector('#'+id);
	section.scrollIntoView({behavior: "smooth"});
}

/**
* @description this function is to make the first character after every space capital
* @param {string} an ID of an element
*/
function adjustlinkTitle(str){
	let arr = str.split(' ');
	str = "";
	for(let i=0;i<arr.length;i++){
		s = arr[i];
		str += s.slice(0,1).toUpperCase() + s.slice(1);
		str += (i != arr.length-1)? " ":"";
	}
	return str;
}

/**
* @description this is a function to build the navigation bar
*/
function buildNav(){
	const sections = document.getElementsByTagName("section"); // an array of the page sections
	const navigation = document.querySelector('#navbar__list');  // a variable to select the navigation bar
	
	//this loop to go through all the page sections and creating a link for each one of them in the navigation bar
	for (let i=0;i<sections.length;i++){
		navigation.innerHTML +="<li><a class='menu__link' href='javascript:smoothScroll(\""+sections[i].getAttribute('id')+"\");'> " + adjustlinkTitle(sections[i].getAttribute('id')) + " </a></li>"; // using the innerHTML property to complete the unordered list and create a link in each list item that refer to a section in the page
	}
}


/**
* @description this function is needed to detect if an element is in view port or not
* @param {HTML Object} ele
* @returns {Boolean} return true if the element top bounding <=1
*/
function isInViewPort(ele){
	return ele.getBoundingClientRect().top <= 1; 
}

/**
* @description this function is needed to change the style of the active section
*/
function changeActiveSection() { 
	const sections = document.getElementsByTagName("section"); // an array of the page sections
	const links = document.getElementsByClassName('menu__link');
	
	let isActiveClass = false; // this flag will turn to true when find the choosen one section to be active
	
	// this loop to go through the sections from the bottom to the up 
	for (let i=(sections.length-1);i>=0;i--){
		if(isInViewPort(sections[i]) && isActiveClass == false){ // if the section is the choosen one section to be active
			sections[i].classList.add('your-active-class'); // activate the section
			
			links[i].style.backgroundColor = "#333";
			links[i].style.color = "#fff";
			
			isActiveClass = true; // turn this variable to true to prevent the loop to go inside the if statement again 
		}else{
			sections[i].classList.remove('your-active-class'); // turn the other sectond to non-activated one
			links[i].style.backgroundColor = "";
			links[i].style.color = "";
		}
	}
}


window.onscroll = function(){changeActiveSection()}; // when the window scrolled call the active scroll function
buildNav(); // call the function to create the navigation 