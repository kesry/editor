const { dialog } = require('electron');
const path = require('path');
const fs = require('fs');
async function handleChooseDir() {
  const { canceled, filePaths } = await dialog.showOpenDialog({ "properties": ["openDirectory"] })
  if (canceled) { //点击了取消
    return "点击了取消！";
  } else {
    let dirAbsolutePath = filePaths[0];
    let result = {};
    try {
      getDirListSync(dirAbsolutePath, result)
    } catch(e) {
      console.error(e);
    }
    // console.log(JSON.stringify(result));
    return result;
  }
}

function getDirListSync(dirPath, obj) {
  let files = fs.readdirSync(dirPath);
  for(let file of files) {
    let stats = fs.statSync(path.join(dirPath, file));
    if(stats.isDirectory()) {
      obj[file] = {"directory": true};
      getDirListSync(path.join(dirPath, file), obj[file]);
    } else if(stats.isFile()) {
      obj[file] = { "file": true, "filePath": path.join(dirPath, file) }
    }
  }
}



module.exports = {
  handleChooseDir
}
