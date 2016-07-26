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
│   ├── single.html               基本レイアウト
│   └── terms.html
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
