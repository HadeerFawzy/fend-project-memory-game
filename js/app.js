$( document ).ready(function() {
	/*
	 * Display the cards on the page
	 *   - shuffle the list of cards using the provided "shuffle" method below
	 *   - loop through each card and create its HTML
	 *   - add each card's HTML to the page
	 */

	/*
	 * Create a list that holds all of your cards
	 */
	function getCards() {
		// get the icons classes
		let cardsArr = ['fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-paper-plane-o'];

		// duplicate the icons classes
		cardsArr = cardsArr.concat(cardsArr);

		//send the classes to the shuffle function
		let shuffledArr = shuffle(cardsArr);

		// draw the DOM
		drawDom(shuffledArr);
	}

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

	// function draw the DOM
	function drawDom (array) {
    resetMoves();
		$("#deck").empty();
		var ul = $("#deck");

		$.each(array, function(i,className) {
			var cardStructure = '<li class ="card" cardIndex=' + i + '><i class="fa ' + className + '"></i></li>';
			// cardStructure.click(clickCard);
			ul.append(cardStructure);
		});
	}

	//  add click listener to the cards
	$(".deck").on("click","li",function() {
		listOfOpenedCards($(this));
  });

	// array of clicked cards
	var arrOfOpenedCards = [];
	function listOfOpenedCards(card){

		// check that card doesn't already opend
		if ( !card.hasClass('open show') ){
			card.addClass('open show');

			// variables check that doesn't click on the same card
			var firstIndex = $(arrOfOpenedCards[0]).attr("cardIndex");
			var secondIndex = $(card).attr("cardIndex");

			// check that doesn't click on the same card
			if ((firstIndex !==  secondIndex)){

				// if the array is empty
				if(arrOfOpenedCards.length === 0){
					arrOfOpenedCards.push(card);
				}else if(arrOfOpenedCards.length === 1){
					// increase the moves number by 1 every 2 moves
					movesIcrease();

					// get the classes of the clicked lis
					var firstClass = $(arrOfOpenedCards[0]).children().attr("class").toString();
					var secondClass = $(card).children().attr("class").toString();
					// compare the classes of the clicked lis
					if(firstClass === secondClass){
						match(arrOfOpenedCards[0], card);
					}else{
						dontMatch(arrOfOpenedCards[0], card);
					};

				}
			}
		}
	}

	// if opened cards matched
	function match(firstCard, secondCard){
		firstCard.addClass('match');
		secondCard.addClass('match');
		arrOfOpenedCards = [];
		checkEndOfGame();
	}

	// if opened card don't match
	function dontMatch(firstCard, secondCard){
		setTimeout(function(){
			firstCard.removeClass('open show');
			secondCard.removeClass('open show');
			arrOfOpenedCards = [];
		}, 400);
	}

	getCards();

	// reset moves number
  function resetMoves(){
    var moves = 0;
    $("#moves").text(moves);
    return moves;
  }

  // moves number increasing
  var movesNumber = resetMoves();
  function movesIcrease() {  
		movesNumber = movesNumber + 1;
		$("#moves").text(movesNumber);
	};

	// check if all matches, restart the game
	var matchedTimes = 1;
	function checkEndOfGame() {
		if(matchedTimes === 8) {
			console.log("CONGRATULATIONS You Won *****");
			rate();
			setTimeout(function(){
				getCards ();
				clearTimer();
        resetMoves();
			}, 400);
		}else{
			matchedTimes = matchedTimes + 1;
		}
	};

	// timer
	// used help from (https://jsfiddle.net/Daniel_Hug/pvk6p/)
  var seconds = 0, minutes = 0, hours = 0, t;
  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
    }

    $("#timer").text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
    timer();
	}
	function timer() {
	  t = setTimeout(add, 1000);
	}
	timer();
	function clearTimer() {
		$("#timer").text("00:00:00");
    seconds = 0; minutes = 0; hours = 0;
	}

	// rating function
	function rate(){
    moves = resetMoves();
		$(".fa-star").each(function(index) {
		  if(moves <= 14){
		  	$(this).css('display', 'block');
			}else if((moves>14) && (moves<=20)){
				if(index <= 1){
					$(this).css('display', 'block');
				}
			}else{
				if(index === 0){
					$(this).css('display', 'block');
				}
			}
		});
	}

  // restart btn
  $("#restart").on("click",function() {
    getCards();
    clearTimer();
    timer();
    resetMoves();
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