var myapp = angular.module('todoApp', []);


myapp.controller('todoCtrl', function ($scope) {
	
  $scope.isAuthorized = localStorage.getItem('trello_token');
  $scope.title = "The New and Improved Todo List"
  
  $scope.getBoards = function() {
	// Get all of the information about the boards you have access to
	var success = function(successMsg) {
	  console.log(successMsg);
	};

	var error = function(errorMsg) {
	  asyncOutput(errorMsg);
	};

	Trello.get('/member/me/boards', success, error);
  }
  
  $scope.getBoard = function(boardId) {
	// Get all of the information about the list from a public board
	var success = function(successMsg) {
	  console.log(successMsg);
	  asyncOutput(successMsg);
	};

	var error = function(errorMsg) {
	  asyncOutput(errorMsg);
	};

	Trello.boards.get(boardId, success, error);
  }
  
  $scope.getLists = function(listId) {
	// Get all of the information about the list from a public board
	var success = function(successMsg) {
	  asyncOutput(successMsg);
	};

	var error = function(errorMsg) {
	  asyncOutput(errorMsg);
	};

	Trello.lists.get(listId, success, error);
  }
  
  $scope.getCards = function(cardId) {
	// Get all of the information about the list from a public board
	var success = function(successMsg) {
	  asyncOutput(successMsg);
	};

	var error = function(errorMsg) {
	  asyncOutput(errorMsg);
	};

	Trello.cards.get(cardId, success, error);
  }
  
  $scope.getChecklists = function(cardId) {
	// Get all of the information about the list from a public board
	var success = function(successMsg) {
	  asyncOutput(successMsg);
	};

	var error = function(errorMsg) {
	  asyncOutput(errorMsg);
	};

	Trello.checklists.get(cardId, success, error);
  }
  
  $scope.authorize = function() {
	var authenticationSuccess = function() { 
		document.getElementById("sign-in-trello").style.display = 'none';
		$scope.getBoards();
	};
	var authenticationFailure = function() { console.log("Failed authentication"); };
	
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
});