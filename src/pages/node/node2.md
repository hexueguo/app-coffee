
NodeJS提供了基本的文件操作API，但是像文件拷贝这种高级功能就没有提供，因此我们先拿文件拷贝程序练手。与copy命令类似，我们的程序需要能接受源文件路径与目标文件路径两个参数

- 小文件拷贝
```
var fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

- 大文件拷贝
```
var fs = require('fs');

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：

- 文件属性读写。

  其中常用的有fs.stat、fs.chmod、fs.chown等等。

- 文件内容读写。

  其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

- 底层文件操作。

  其中常用的有fs.open、fs.read、fs.write、fs.close等等。