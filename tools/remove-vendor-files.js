const path = require('path');
const fs = require('fs');

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return [];
  }

  const found = [];

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      found.push(...fromDir(filename, filter)); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      found.push(filename);
    }
  }

  return found;
}

function bulkRemove(paths) {
  paths.forEach((path) => fs.rm(path, () => {}));
}

function cleanEmptyFoldersRecursively(folder) {
  var fs = require('fs');
  var path = require('path');

  var isDir = fs.statSync(folder).isDirectory();
  if (!isDir) {
    return;
  }
  var files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function (file) {
      var fullPath = path.join(folder, file);
      cleanEmptyFoldersRecursively(fullPath);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folder);
  }

  if (files.length == 0) {
    console.log('removing: ', folder);
    fs.rmdirSync(folder);
    return;
  }
}

const main = () => {
  const foundTsFiles = fromDir('./src/types', '.ts');
  const requiredProtoFiles = foundTsFiles.map((f) =>
    f.replace('src/types', 'vendor').replace(/\.ts$/, '.proto'),
  );
  const allProtoFiles = fromDir('./vendor', '');
  const protoFilesToRemove = allProtoFiles.filter(
    (p) => !requiredProtoFiles.includes(p),
  );

  bulkRemove(protoFilesToRemove);
  cleanEmptyFoldersRecursively('./vendor');
};

main();
