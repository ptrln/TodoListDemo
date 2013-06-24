class TodoItemsController < ApplicationController
  def create
    @todo_item = TodoItem.create!(
      ({ :todo_list_id => params[:todo_list_id] }).merge(params[:todo_item])
    )
    
    render :json => @todo_item
  end
  
  def index
    @todo_items = TodoItem.where(:todo_list_id => params[:todo_list_id])
    render :json => @todo_items
  end
end
