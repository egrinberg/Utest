# Utest

Command-line tool for finding and reporting dead links in a file written in node.js

**Installation**

> npm i -g https://github.com/egrinberg/Utest

**Usage**

Find and check URLs inside file:

> utest -f <filename> or utest --file <filename>

Print the response in JSON format:

> utest -j -f <filename> or utest --json -f <filename> or utest -j -file <filename> or utest --json --file <filename>

Version information:

> utest -v or -V or --version

Help:

> utest -h or utest --help

**Features**

- The tool finds all URLs in the file by using http:// or https:// schemes

- The tool checks all the links and prints the links along with the status code as follow

  - Status code 200 is printed in green

  - Status code 400 or 404 is printed in red

  - All other statuses are printed in grey

- Running the tool with the v or version argument prints the name of the tool and its version inside a customized box

- Network code is optimized to only request headers

- Appropriate error code is printed when program exits. If there are no errors meaning all links are good,the program exits with 0. Otherwise, exits with a non-zero exit code.

For examples please visit https://medium.com/@egrinberg/cli-utest-19f1429a8de4
