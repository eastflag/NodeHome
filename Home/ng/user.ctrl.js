angular.module('app')
.controller('UserCtrl', function($scope, UserSvc){
	$scope.edit = false;
	$scope.deleteId;
	
	UserSvc.fetch()
	.success(function(users) {
		$scope.users = users;
	})

	$scope.saveUser = function () {
		if($scope.edit) {  //수정
			UserSvc.modify({ _id: $scope.id,  name: $scope.name, password: $scope.password })
			.success(function(data){
				refreshUpdate($scope.id);
				$scope.id = null;
				$scope.name = null;
				$scope.password =null;
				$scope.edit = false;
			});
		} else { //생성
			UserSvc.create({ _id: $scope.id,  name: $scope.name, password: $scope.password })
			.success(function(user){
				$scope.users.unshift(user);
				$scope.id = null;
				$scope.name = null;
				$scope.password =null;
			});
		}
		
	}
	
	$scope.editUser = function(user) {
		$scope.edit = true;
		$scope.id = user._id;
		$scope.name = user.name;
		$scope.password =user.password;
	}
	
	$scope.deleteConfirm = function(user) {
		console.log('userId:' + user._id);
		$scope.deleteId = user._id;
		$("#dialogDelete").modal('show');
	}
	
	$scope.deleteUser = function() {
		$("#dialogDelete").modal('hide');
		UserSvc.remove({_id: $scope.deleteId})
		.success(function(data){
			refreshDelete($scope.deleteId);
		});
	}
	
	function refreshUpdate(userId) {
		for(var i=0; i < $scope.users.length ; ++i) {
			console.log('user:' + $scope.users[i]._id);
			if (userId == $scope.users[i]._id) {
				$scope.users[i].name = $scope.name;
				$scope.users[i].password = $scope.password;
			}
		}
	}
	
	function refreshDelete(userId) {
		console.log('delete userId:' + userId);
		for(var i=0; i < $scope.users.length ; ++i) {
			console.log('user:' + $scope.users[i]._id);
			if (userId == $scope.users[i]._id) {
				console.log('deleted');
				$scope.users.splice(i, 1); //i번째부터 항목을 1개 삭제
				return;
			}
		}
	}
})