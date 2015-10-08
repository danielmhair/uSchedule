var myapp = angular.module('todoApp', []);


myapp.controller('todoCtrl', function ($scope) {
  $scope.isLoggedIn = Trello.authorized();
  $scope.title = "The New and Improved Todo List";
  
  var onAuthorize = function() {
  	updateLoggedIn();
  	$("#boards").empty();
  	Trello.members.get("me", function(member){
  		$("#fullName").text(member.fullName);
  		getBoardsWithLists();
  	});
  };
  
  var getBoardsWithLists = function() {
	  var $boards = $("<div>")
  			.text("Loading Boards...")
  			.appendTo("#boards");
  		// Output a list of all of the cards that the member 
  		// is assigned to
	  Trello.get("members/me/boards", function(boards) {
  			$boards.empty();
  			$.each(boards, function(ix, board) {
  				$("<div>")
					.attr({ id: board.id })
					.addClass("board")
					.appendTo($boards);
				$("<h2>")
					.attr({ id: "title-" + board.id })
					.appendTo("#" + board.id); 
				$("<a>")
					.attr({ href: board.url, target: "trello" })
					.text(board.name)
					.appendTo("#title-" + board.id);
				
				getListsWithCards(board);
				
  			});
  		});
  }
  
  var getListsWithCards = function(board) {
	var $lists = $("<div>")
		.text("Loading Lists...")
		.appendTo("#" + board.id);
	Trello.get("boards/" + board.id + "/lists", function(lists) {
		$lists.empty();
		$.each(lists, function(ix, list) {
			$("<div>")
				.attr({ id: list.id })
				.addClass("list")
				.appendTo($lists);
			$("<h3>")
				.attr({ id: "list-title-" + list.id })
				.appendTo("#" + list.id); 
			$("<a>")
				.attr({ href: list.url, target: "trello" })
				.text(list.name)
				.appendTo("#list-title-" + list.id);
			getCards(list);
		}); 
	}, function(error) { console.log(error); });
  }
  
  var getCards = function(list) {
	var $cards = $("<div>")
		.text("Loading Cards...")
		.appendTo("#" + list.id);
	Trello.get("lists/" + list.id + "/cards", function(cards) {
		$cards.empty();
		$.each(cards, function(ix, card) {
			$("<div>")
				.attr({ id: card.id })
				.addClass("card")
				.appendTo($cards);
			$("<p>")
				.attr({ id: "card-title-" + card.id })
				.appendTo("#" + card.id); 
			$("<a>")
				.attr({ href: card.url, target: "trello" })
				.text(card.name)
				.appendTo("#card-title-" + card.id);
		});
		
	}, function(error) { console.log(error); });
  }
  
  var updateLoggedIn = function() {
  	var isLoggedIn = Trello.authorized();
  	$scope.isLoggedIn = isLoggedIn;
  	$("#loggedout").toggle(!isLoggedIn);
  	$("#loggedin").toggle(isLoggedIn); 	
  };
  
  $scope.authorize = function() {
	var authenticationSuccess = function() { 
		onAuthorize();
		document.getElementById("header").style.display = "block !important";
	};
	var authenticationFailure = function() { 
		
	};
	
	Trello.authorize({
	  type: "popup",
	  name: "The New and Improved BYU Helper Todo",
	  scope: {
		read: true,
		write: true 
	  },
	  expiration: "never",
	  success: authenticationSuccess,
	  error: authenticationFailure
	});
  }
  	
  $scope.logout = function() {
  	Trello.deauthorize();
  	updateLoggedIn();
	document.getElementById("header").style.display = "none !important";
};
  						  
  //Trello.authorize({
	//  type: "popup",
	//  name: "The New and Improved BYU Helper Todo",
	//  scope: {
	//	read: true,
	//	write: true 
	//  },
	//  expiration: "never",
	//  success: onAuthorize
	//});
  //
});