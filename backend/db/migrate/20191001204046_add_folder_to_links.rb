class AddFolderToLinks < ActiveRecord::Migration[6.0]
  def change
    add_reference :links, :folder, foreign_key: true
  end
end
