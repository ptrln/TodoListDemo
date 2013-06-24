class TodoItem < ActiveRecord::Base
  belongs_to :todo_list
  
  validates :title, :todo_list, :presence => true
end
