## front react : local_develop branch
 localhost:3000での開発用ブランチ。
 変更点は、
・各ファイルの{api_url}などを排除して、`/authen/`
としたこと。
・package.json

# 利用法
- package.jsonのproxyで、
  "proxy":"http://localhost:8000",
  "proxy": "https://pure-reaches-08614-283f2e14249d.herokuapp.com",
 を切り替える。
　
## main_testブランチ
・public内整備。reset.css、style.cssを移動。package.jsonなど削除。
・index.jsでcssをimport
・今までのbuildフォルダ削除
・build
・package.jsonに、"homepage": "/static/react" を指定。

