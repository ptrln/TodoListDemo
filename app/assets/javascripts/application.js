// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require_tree .

function TodoList(params) {
  this.setAttributes(params);
}

TodoList.fetch = function (callback) {
  $.ajax({
    url: "/todo_lists.json",
    type: "get",
    success: function (todoListParams) {
      var todoLists = _(todoListParams).map(function (todoListParam) {
        return new TodoList(todoListParam);
      });

      callback(todoLists);
    }
  });  
}

TodoList.prototype.asJSON = function () {
  return { id: this.id, title: this.title };
}

TodoList.prototype.setAttributes = function (params) {
  var that = this;
  _(params).each(function (value, key) {
    that[key] = value;
  });
}

TodoList.prototype.update = function (callback) {
  var that = this;

  $.ajax({
    url: "/todo_lists/" + this.id + ".json",
    type: "put",
    data: {
      todo_list: that.asJSON()
    },
    success: function (updatedParams) {
      that.setAttributes(updatedParams);

      callback();
    }
  });
}

$(function () {
  TodoList.fetch(function (todoLists) {
    var $ul = $("#todo-lists");
    _(todoLists).each(function (todoList) {
      var $li = $("<li></li>").text(todoList.title);
      $ul.append($li);
    });
  });
});
