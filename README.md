hgbs-tpl
=========

* hugo gulp bootstrap scssを利用したテンプレード
* IE8+に対応(ES6化しない)
* scssに手を入れてデザイン変更することが前提なのでhugoテンプレート化はしない
* 日本語に最適化する予定
* すべてのjsファイルはmain.jsにrequireし、出力されるファイルはこれだけ
* すべてのcssファイルはmain.scssに@importし、出力されるファイルはこれだけ

インストール
------------

```
$ brew install hugo
$ brew install homebrew/versions/node5
$ npm install
```

今後のnodeのアップデートでgulpプラグインが動かなくなる可能性があるためnode5にしている
(最新の環境だとwarningが出るプラグインがいくつかあるが現時点では一応動く)

その他の使い方
------

その他の使い方については[ドキュメント](docs/README.md)を参照
