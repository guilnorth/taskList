function getTasks(){
	this.itens = [];

	var lista = localStorage.getItem("taskList");
	if(lista !== null)
		this.itens = angular.fromJson(lista);

	//Remove
	this.remove = function(item){
		var pos = this.itens.indexOf(item);
		this.itens.splice(pos,1);
	}
	//Add
	this.add = function(item){
		this.itens.push(item);
	}

	//Save
	this.save = function(){
		var lista = angular.toJson(this.itens);
		localStorage.setItem('taskList',lista);
	}
}