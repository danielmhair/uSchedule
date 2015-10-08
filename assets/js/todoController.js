var myapp = angular.module('todoApp', []);


myapp.controller('todoCtrl', function ($scope) {
  $scope.isLoggedIn = Trello.authorized();
  $scope.title = "The New and Improved Todo List";
  
  var onAuthorize = function() {
  	updateLoggedIn();
  	$("#cards").empty();
  	console.log("updated login");
  	Trello.members.get("me", function(member){
  		$("#fullName").text(member.fullName);
  		var $cards = $("<div>")
  			.text("Loading Cards...")
  			.appendTo("#cards");
  		// Output a list of all of the cards that the member 
  		// is assigned to
  		Trello.get("members/me/cards", function(cards) {
  			$cards.empty();
  			$.each(cards, function(ix, card) {
  				$("<div><a>")
  				.attr({href: card.url, target: "trello"})
  				.addClass("card")
  				.text(card.name)
  				.appendTo($cards);
  			});  
			console.log(cards);
  		});
  	});
  
  };
  
  var updateLoggedIn = function() {
  	var isLoggedIn = Trello.authorized();
  	$scope.isLoggedIn = isLoggedIn;
  	$("#loggedout").toggle(!isLoggedIn);
  	$("#loggedin").toggle(isLoggedIn); 	
  };
  
  $scope.authorize = function() {
	var authenticationSuccess = function() { 
		onAuthorize();
	};
	var authenticationFailure = function() { 
		console.log("Failed authentication"); 
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