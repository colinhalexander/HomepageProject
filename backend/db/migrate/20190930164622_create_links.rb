class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.string :title
      t.string :url
      t.string :icon

      t.timestamps
    end
  end
end
