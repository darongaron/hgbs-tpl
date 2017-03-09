hgbs-tpl
=========

* 未完成
* hugo gulp bootstrap scssを利用したテンプレード
* IE8+に対応(ES6化しない)
* scssに手を入れてデザイン変更することが前提なのでhugoテンプレート化はしない
* 日本語に最適化する予定
* すべてのjsファイルはmain.jsにrequireし、出力されるファイルはこれだけ
* すべてのcssファイルはmain.scssに@importし、出力されるファイルはこれだけ

インストール
------------

### hugoのインストール

hugoがインストールされていない場合下記のようにインストールする

#### goがインストールされているなら

```
$ go get -u -v github.com/spf13/hugo
```

#### goがインストールされていなければ

```sh
$ brew install hugo
```

### nodeのインストール

```
$ brew install node
```

今後のnodeのアップデートでgulpプラグインが動かなくなる可能性がある
もし動かなければ下記のようにnode5を指定する
(最新の環境だとwarningが出るプラグインがいくつかあるが現時点では一応動く)

```sh
$ brew install homebrew/versions/node5
```

### gulpのインストール

gulpがglobalにインストールされていなければインストールする

```sh
$ npm install --global gulp
```

### nodeパッケージをインストール

```sh
$ npm install
```


その他の使い方
------

その他の使い方については[ドキュメント](docs/README.md)を参照
