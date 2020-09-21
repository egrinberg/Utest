# Utest

Command-line tool for finding and reporting dead links in a file written in node.js

**Features**

The tool finds all URLs in the file by using the following schemes:

-http://

-https://

The tool supports the following status codes:

-200

-400

-404

**Installation**

- Clone the repository to your local machine

- Install the tool globally by running the following command

> npm i -g Utest

**Usage**

Find and check URLs inside file:

> Utest -f file.txt

Version information:

> Utest -v

Help:

> Utest
