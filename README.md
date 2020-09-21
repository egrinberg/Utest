# Utest

Command-line tool for finding and reporting dead links in a file written in node.js

**Installation**

- Install the tool globally by running the following command

> npm i -g Utest

**Usage**

Find and check URLs inside file:

> Utest -f file.txt

Version information:

> Utest -v

Help:

> Utest or Utest -h


**Features**

The tool finds all URLs in the file by using the following schemes: 

- http://

- https://

The tool checks all the links and prints the output as follow

- Status code 200 is printed in green

- Status code 400 or 404 is printed in red

- All other statuses are printed in grey
