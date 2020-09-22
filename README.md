# Utest

Command-line tool for finding and reporting dead links in a file written in node.js

**Installation**

> npm i -g https://github.com/egrinberg/Utest


**Usage**

Find and check URLs inside file:

> utest -f filename

Version information:

> utest -v

Help:

> utest or utest -h


**Features**

The tool finds all URLs in the file by using http:// or https:// schemes

The tool checks all the links and prints the links along with the status code as follow

- Status code 200 is printed in green

- Status code 400 or 404 is printed in red

- All other statuses are printed in grey

For examples please visit https://medium.com/@egrinberg/cli-utest-19f1429a8de4
