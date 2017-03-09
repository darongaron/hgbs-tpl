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

基本的な使い方
-----

### サーバーを起動して開発

ブラウザで表示し修正をリアルタイムに反映する

```sh
$ gulp serve
```

### サーバーを起動せずにhtml, css, js開発

特にブラウザで表示させて開発する必要がない場合

```sh
gulp watch
```

### リリース資産の作成(build)

本番にアップロードする資産を作成する

それぞれのコンテンツがminifyされた状態で出力される

```sh
gulp
```

### 本番資産の確認

本番資産をブラウザで表示させて確認する場合

もしminifyなどにバグがあった場合に確認できる

```sh
gulp serve:dist
```

### コンテンツの追加

下記のように```hugo new```コマンドで記事の追加が行える

```
$ hugo new post/good-to-great.md
```

下記のようにcontentディレクトリ以下にディレクトリごと作成される

```
content/post/good-to-great.md
```

その他の使い方
------

その他の使い方については[ドキュメント](docs/README.md)を参照
