$( document ).ready(function() {
	/*
	 * Create a list that holds all of your cards
	 */

	// get the icons classes
	let cardsArr = ['fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-paper-plane-o'];
	// duplicate the icons classes
	cardsArr = cardsArr.concat(cardsArr);
	//send the classes to the shuffle function
	let shuffledArr = shuffle(cardsArr);
	console.log(shuffledArr);

	/*
	 * Display the cards on the page
	 *   - shuffle the list of cards using the provided "shuffle" method below
	 *   - loop through each card and create its HTML
	 *   - add each card's HTML to the page
	 */

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}

	// get the ul of the cards and empty it
	let arrOfClicked = [];

	function reset(){

	  let moves = 0;
	  $("#moves").text(moves);

	  let cardsWrapper = $('#deck');
	  cardsWrapper.empty();

	  for (let i=0; i< shuffledArr.length; i++){
	    let liStructure = $('<li class="card"></li>');
	    let iconElement = $('<i class="fa"></i>');
	    iconElement.addClass(shuffledArr[i]);

	    liStructure.append(iconElement);
	    cardsWrapper.append(liStructure);

	    liStructure.click(function() {
	      $(this).addClass("open show");
	      let iconClasses = $(this).children().attr("class");
	      arrOfClicked.push(iconClasses);

	      console.log(arrOfClicked);

	      // if there are two clicked cards
	      if(arrOfClicked.length === 2){
	        moves = moves + 1;
	        $("#moves").text(moves);

	        // check if they match
	        if(arrOfClicked[0] === arrOfClicked[1] ){
	          matchedClass = arrOfClicked[0];
	          // get their parents to add class matched
	          $( "i.fa" ).each(function( index ) {
	            if ($(this).hasClass(matchedClass)){
	              $(this).parent().addClass("open show match");
	            }
	          });
	        }
	        // else if they don't match
	        else{
	          // get their parent to remove class show
	          // setTimeout(function() {
	          //   $( "i.fa" ).each(function( index ) {
	          //     $(this).parent().removeClass("show open");
	          //   });
	          // }, 1500);
	          $( "i.fa" ).each(function( index ) {
	            $(this).parent().removeClass("show open");
	          });

	        }
	        arrOfClicked = [];
	      }

	    });

	  }


	};

	reset();

	$("#restart").click(function() {
	  reset();
	});

	/*
	 * set up the event listener for a card. If a card is clicked:
	 *  - display the card's symbol (put this functionality in another function that you call from this one)
	 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	 *  - if the list already has another card, check to see if the two cards match
	 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
	 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
	 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	 */
});