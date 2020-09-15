#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const LOG_LEVEL = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5
}

program
  .option('-a, --appender <appender>', 'appender', '')
  .option('-l, --level <level>', 'log level', 'TRACE')

var stdin = '';
program.action(function (input) {
  if (stdin) {
    input = stdin;
  }
  
  const logs = parseJson(input);
  logs.forEach((log) => {
    const {
      level, message, appender, instant:{epochSecond}, thrown
    } = log
    
    const date = new Date(epochSecond * 1000).toISOString();

    if(LOG_LEVEL[level] >= LOG_LEVEL[program.level]) {
      if(!program.appender || (program.appender && program.appender === appender)) {
        console.log(`(${appender}) ${(date)} ${level} : ${message}`);

        if(thrown) {
          const {
            extendedStackTrace
          } = thrown
              
          const stackTrace = extendedStackTrace.split("\n");
          stackTrace.forEach((row) => {
            console.log(row)
          });
        }

      }
    }  
  });
});

if (process.stdin.isTTY) {
  program.parse(process.argv);
} else {
  process.stdin.on("readable", function () {
    var chunk = this.read();
    if (chunk !== null) {
      stdin = chunk.toString();
      program.parse(process.argv);
    }
  });
  process.stdin.on("end", function () {
    program.parse(process.argv);
  });
}


function parseJson(data) {
  data = data.split("\n");
  return data.map((log) => {
    try {
      return JSON.parse(log);
    } catch (error) {
      return undefined;
    }
  }).filter(log => log);
}