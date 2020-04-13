/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/*** 
 * Global variables used in various functions.
***/

const studentListItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;
const pageContainer = document.querySelector('.page');


/*** 
 * `showPage` function to hide all of the items in the list except for the ten you want to show.
 * @param {array} list - accepts an array of list elements.
 * @param {number} page - accepts the page number you want to view.
***/

function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);

   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         studentListItems[i].style.display = 'block';
      } else {
         studentListItems[i].style.display = 'none';
      } 
   }
}


/*** 
 * `appendPageLinks function` - generate, append, and add functionality to the pagination buttons.
   When pagination links are clicked, the student items contained in that page are displayed, and the 
   clicked pagination link remains highlighted.
   @param {array} list - accepts an array of list elements.
***/

function appendPageLinks(list) {
   const listLength = list.length;
   const pagesNeeded = Math.ceil(listLength/itemsPerPage);
   let paginationStart = `<ul>`;
   const newDiv = document.createElement('div');

   newDiv.className = "pagination";
   pageContainer.appendChild(newDiv);

   for (let p = 0; p <= pagesNeeded; p += 1) {
      if (p === 0 || p < pagesNeeded ) {
         paginationStart += `<li><a href="#">${p+1}</a></li>`
      } else {
         paginationStart += `</ul>`;
      }
   }
   newDiv.innerHTML = paginationStart;

   const aPageElement = document.querySelectorAll('.pagination a');
   aPageElement[0].classList.add('active');
   for (let a = 0; a < aPageElement.length; a += 1) {
      aPageElement[a].addEventListener('click', () => {
         for (let b = 0; b < aPageElement.length; b += 1) {
            aPageElement[b].classList.remove('active');
         }
         aPageElement[a].classList.add('active');
         showPage(studentListItems, a+1);
      });
   }
}


/***
 * Called the `showPage` function to display the first ten student list elements on the first page.
 * Called the `appendPageLinks` function to append the appropriate number of page links based on the `studentListItems` length.
***/

showPage(studentListItems, 1);
appendPageLinks(studentListItems);


/***
 * appendSearchBar function - Appends a search bar to the page.
 * Called the `appendSearchBar` function to append the search bar at the top of the page.
***/

function appendSearchBar() {
   const pageHeaderContainer = document.querySelector('.page-header');
   const searchBarContainer = document.createElement('div');
   pageHeaderContainer.appendChild(searchBarContainer);
   searchBarContainer.classList.add("student-search");
   searchBarContainer.innerHTML = `<input id="search-input" placeholder="Search for students..."><button id="search-button">Search</button>`;
}
appendSearchBar()


/***
 * Create global variables for the search input and search button.
***/

const search = document.querySelector('#search-input');
const submit = document.querySelector('#search-button');


/***
 * `searchList` function - filters the list of students when a user uses the search bar. In addition
   calls the `addNoResultAlert` and `adjustPagination` functions.
***/

function searchList(searchInput, students) {
   let searchResults = [];

   for (let i = 0; i < students.length; i += 1) {
      students[i].style.display = 'none';
      if (searchInput.value.length !== 0 && students[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
      } else if (searchInput.value.length === 0) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(studentListItems, 1);
      }
   }
   addNoResultAlert(searchResults);
   adjustPagination(searchResults);
 }


/***
* Called the `searchList` function on `#search-button` click events.
* Called the `searchList` function on `#search-input` keyup events.
***/

 submit.addEventListener('click', (event) => {
   event.preventDefault();
   searchList(search, studentListItems);
 });

 search.addEventListener('keyup', () => {
   searchList(search, studentListItems);
 });


 /**
  * `adjustPagination` function -  removes the existing pagination, and adds new pagination based on the number of students in the filtered list.
  * @param {array} list - accepts an array filtered student list elements.
  ***/

 function adjustPagination(list) {
    const paginationContainer = document.querySelector('.pagination');
    pageContainer.removeChild(paginationContainer);
    appendPageLinks(list);
 }


 /***
  * `addNoResultAlert` function - accepts a list and displays 'No Result' if the list is empty.
  * @param {array} list - accepts an array of filtered student list elements.
  */
 function addNoResultAlert(list) {
    if (list.length === 0) {
       const noResultAlertContainer = document.createElement('p');
       noResultAlertContainer.textContent = "No Results";
       pageContainer.appendChild(noResultAlertContainer);
    }
 }