機能
----

*

* 記事の一覧で記事のSummaryを表示しているが記事にDescriptionが設定されている場合にはDescriptionを表示する。 
* keywordsが設定されていない場合はkeywordsのかわりにカテゴリーとタグをに設定されている値を出力する。それも設定されていなければkeywordsタグを出力しない。

menuの設定
----------

### config.toml

#### 各ページに飛ばす

```
[[menu.main]]
    name = "Tools"
    url = "/tools/"
    pre = "<i class='fa fa-cogs'></i>"
    weight = -25
```

#### 他のサイトに飛ばす

```
[[menu.main]]
    parent = "themes"
    name = "Theme Showcase"
    url = "http://themes.gohugo.io"
    weight = -170
[[menu.main]]
```

### contents

```
menu: "main"
```

```
[[menu.main]]
  parent: extras
weight: 60
```

ディレクトリの説明
-------------

```
app
├── images                         画像は全てこの中 リリース時に圧縮される
├── scripts                        jsは全てこの中
│   └── main.js                   すべてのjsをこのファイルにrequireする
└── styles                         scssは全てこの中
    ├── _bootstrap-custom-var.scss bootstrapの変数を変更する場合にはここに記述
    └── main.scss                  すべてのcssをこのファイルに@importする
archetypes/                           記事の素になるテンプレートはこの中
config.tml                            hugoの設定
content/                              記事はこの中に作る
data/                                 hugoで利用するデータはこの中
dist/                                 リリース用のファイルを格納する一時ディレクトリ
docs/                                 このプロジェクトのドキュメント
gulpfile.js                           gulpの設定
layouts/                              hugoのレイアウト
├── _default                       サイトの基本レイアウト
│   ├── grid.html
│   ├── li.html
│   ├── list.html
│   ├── single.html               記事ページレイアウト
│   └── terms.html				  category,tag一覧ページレイアウト
├── index.html                     ホームページのレイアウト
├── partials                       部品レイアウト
│   ├── footer.html
│   ├── header_after.html
│   ├── header_before.html
│   ├── pagination.html
│   └── sidebar.html
└── rss.xml
node_modules                          nodeのmoduleを格納する一時ディレクトリ
package.json                          nodeのパッケージの設定
public/                               hugoの出力先一時ディレクトリ
README.md                             このプロジェクトの説明
```
