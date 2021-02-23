const path = require('path'); 
const fs = require('fs');

function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return [];
    }

	const found = []

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            found.push(...fromDir(filename,filter)); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            found.push(filename)
        };
    };

	return found;
};

const found = fromDir('./src/lib','.ts');

const requiredProtoFiles = found.map(f => f.replace('src/lib', 'vendor').replace(/\.ts$/, '.proto'))

const protoFiles = fromDir('./vendor', '')

console.log(found)
console.log(protoFiles.length)
console.log(requiredProtoFiles.length)

const protoFilesToRemove = protoFiles.filter(p => !requiredProtoFiles.includes(p))
console.log(protoFilesToRemove.length)

function bulkRemove(paths) {
	paths.forEach(path => fs.rm(path, () => {}))
}

bulkRemove(protoFilesToRemove)

  function cleanEmptyFoldersRecursively(folder) {
    var fs = require('fs');
    var path = require('path');

    var isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
      return;
    }
    var files = fs.readdirSync(folder);
    if (files.length > 0) {
      files.forEach(function(file) {
        var fullPath = path.join(folder, file);
        cleanEmptyFoldersRecursively(fullPath);
      });

      // re-evaluate files; after deleting subfolder
      // we may have parent folder empty now
      files = fs.readdirSync(folder);
    }

    if (files.length == 0) {
      console.log("removing: ", folder);
      fs.rmdirSync(folder);
      return;
    }
  }


cleanEmptyFoldersRecursively('./vendor')
