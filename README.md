In develoment => for a mature altenative check [bootstrap modal plugin](https://www.w3schools.com/bootstrap/bootstrap_modal.asp)

# infobox_matrix plugin
CSS style and jquery script to show a small portfolio.

Open demo.html to visualize how it works.

## Features

### Dynamic resizing

Each group of infobox under a div of class **_reacting_infobox** will be compress when it is not
visualized and it will be expand when some items will be showed. 

The point is to catch the attention of the user. 

### Dynamic html loading (content)

Each _infobox is linked by its ID to a _modal_popup and (optionally) to a html file.

i.e. #name  => #name_popup => #name.html

The _infobox div can be placed in any part of the html file. However the _modal_popup
div HAS to be declared in the root of the body. By default, the html file are loaded
from a folder called 'additional_content'.

### Multilingual support

Using multilingual tools such as [dislines](http://www.danielclemente.com/dislines/) and
defining the language in the class attribute of the html tag, the plugin support several languages
under the following rules.
-> english (default lang)    file.html
-> language 1 (i.e. Spanish) file.es.html
-> language 2 (i.e. French)  file.fr.html
... and so on


# How to use it

First is to get the css and js files. You can either add the link(to the last version) placed below or download/clone/fork the repository and link locally the files.

###### [infobox_matrix.css](https://github.com/MarcosBernal/infobox_matrix/blob/master/infobox_matrix.css)

`<link rel="stylesheet" href="https://raw.githubusercontent.com/MarcosBernal/infobox_matrix/master/infobox_matrix.css"/>`

###### [infobox_matrix.js](https://raw.githubusercontent.com/MarcosBernal/infobox_matrix/master/infobox_matrix.js)

`<script src="https://raw.githubusercontent.com/MarcosBernal/infobox_matrix/master/infobox_matrix.js"></script>`


# Contributions

Many parts of the code have been taken and modified from web sites such as:

- www.w3schools.com
- www.stackoverflow.com
