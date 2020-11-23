# Utest

Command-line tool for finding and reporting dead links in a file written in node.js

**Installation**

> npm i -g https://github.com/egrinberg/Utest

**Install a Source Code Formatter - Prettier**

- When first open project on VSCode the recommended plugin will pop-up. Install it.

- Otherwise install through command line

> npm install --save-dev --save-exact prettier

**Usage - Prettier**

By default, when file is saved it should be formatted with Prettier.

In order to run Prettier using the command line use the following:

- Format all files with Prettier

  > npm run prettier

- Check that all the files are formatted
  > npm run prettier-check

**Install Linter**

- When first open project on VSCode the recommended plugin will pop-up. Install it.

- Otherwise install through command line

  > npm install eslint --save-dev

**Usage - Linter**

In order to run Linter using the command line use the following:

- Check all files with Linter

  > npm run lint

- Check all the files with Linter and fix problems

  > npm run eslint-fix

**Testing**

The code is split into separated modules located in the lib folder.

Currently fileProcessing module does not have unit test.

- To run tests for other modules:

> npm run test

- To run coverage test:

> npm run coverage

New unit tests guidance:

- The tests are written with jest

- The fetch functionality is mocked up using jest-fetch-mock

- In order to create new suite - Add new file in the lib folder and name it as the original file + test (ex. fileProcessing.test.js)

E2E test:

- Located in the test folder

- To run e2e test:

> npm run test e2e
