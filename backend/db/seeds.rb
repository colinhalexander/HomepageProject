# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Link.destroy_all
Folder.destroy_all

folder1 = Folder.create({name: "Home"})

Link.create({title: "Facebook", url: "http://www.facebook.com", folder: folder1})
Link.create({title: "Google", url: "http://www.google.com", folder: folder1})
Link.create({title: "Twitter", url: "http://www.twitter.com", folder: folder1})
Link.create({title: "Instagram", url: "http://www.instagram.com", folder: folder1})
