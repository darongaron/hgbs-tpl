hgbs-tpl
=========

* hugo gulp bootstrap scssを利用したテンプレード
* IE8以降に対応
* scssに手を入れてデザイン変更することが前提なのでhugoテンプレート化はせず

インストール
============

```
$ brew install hugo
$ brew install homebrew/versions/node5
$ npm install
```

今後のnodeのアップデートでgulpプラグインが動かなくなるかもしれないので
nodeは下記のようにインストールしたほうがいいかもしれない

```
$ brew install homebrew/versions/node5
```

hugo serverの起動
-----------------

hugoでドラフトの文章も表示して監視

```
hugo server -D -w
```

ディレクトリの説明
-------------

```
layouts/
├── _default                 サイトの基本レイアウト
│   ├── grid.html
│   ├── li.html
│   ├── list.html
│   ├── single.html         基本レイアウト
│   └── terms.html
├── index.html               ホームページのレイアウト
├── partials                 部品レイアウト
│   ├── footer.html
│   ├── header_after.html
│   ├── header_before.html
│   ├── pagination.html
│   └── sidebar.html
└── rss.xml
```

