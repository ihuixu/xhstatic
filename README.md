# xhstatic

方便本地开发，cmd写js，less生成css

## Installation

```bash
$ npm install
```

另外需要安装Grunt命令。

## Features

* 写less，生成css
* cmd写js，生成js，压缩js
* m对应wap，包含zepto，less对wap的cssreset
* www对应pc，包含jquery，less对pc的cssreset
* 分别对page下的文件进行监控

默认监控：
```bash
grunt
```

生成js：
```bash
grunt normal
```

生成并压缩js：
```bash
grunt min
```

生成css：
```bash
grunt mkcss
```

生成并压缩js、生成css：
```bash
grunt build
```

