const fs = require('fs');
const path = require('path');

function showDirectoryTree(directory, includeFiles, prefix = '') {
  const files = fs.readdirSync(directory);

  files.forEach((file, index) => {
    const filePath = path.join(directory, file);
    const fileStats = fs.statSync(filePath);
    const isDirectory = fileStats.isDirectory();

    if (isDirectory || includeFiles) {
      const isLast = index === files.length - 1;
      const displayName = isDirectory ? '\x1b[33m' + file + '/' : '\x1b[32m' + file;
      const linePrefix = prefix + (isLast ? '└───' : '├───');
      console.log(linePrefix + displayName + '\x1b[0m');

      if (isDirectory) {
        const nestedPrefix = prefix + (isLast ? '    ' : '│   ');
        showDirectoryTree(filePath, includeFiles, nestedPrefix);
      }
    }
  });
}

function showHelp() {
  console.log('----------------------------------------------------');
  console.log('Usage: node tree.js [directory] [includeFiles]');
  console.log('');
  console.log('Example: ');
  console.log("");
  console.log("node tree.js /Users/ true");
  console.log("");
  console.log("'Users' is the directory you want to show the tree, \n'true' indicates whether you want to include files in \nthe directories, omit this argument if you don't \nwant to include files (or put false on it).");
  console.log('----------------------------------------------------');
}

const args = process.argv.slice(2);
const directoryArg = args[0];
const includeFilesArg = args[1] === 'true';

if (args.includes('help') || args.includes('h')) {
  showHelp();
} else {
  try {
    const directoryPath = directoryArg ? path.resolve(directoryArg) : process.cwd();
    console.log('\x1b[1mDirectory Tree:\x1b[0m');
    showDirectoryTree(directoryPath, includeFilesArg);
  } catch (error) {
    console.error('\x1b[31mError:', error.message + '\x1b[0m');
  }
}
