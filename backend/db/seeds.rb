# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Link.destroy_all
Folder.destroy_all

folder1 = Folder.create({name: "Default"})
folder2 = Folder.create({name: "Random"})

link1 = Link.create({title: "Google", url: "http://www.google.com", folder: folder1})
link2 = Link.create({title: "Facebook", url: "http://www.facebook.com", folder: folder2})
link3 = Link.create({title: "Rails Command Line", url: "https://guides.rubyonrails.org/command_line.html", icon: "https://abs.twimg.com/favicons/favicon.ico", folder: folder2})