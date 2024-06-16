# protobuf_client_azalea

Client/Backendの両方でJavascriptを利用してProtobuf(Protocol Buffers)を使ってみて学習することが趣旨です。

このレポジトリはClient側に該当します。

□ Client側: React.jsで作成した簡易的なWebアプリ。

□ Backend側: node.js(express利用)で作成した簡易的なAPIサーバー。


## 使い方
□ webアプリを始動
```
    npm start
```

□ http://localhost:3000 にアクセスをすると、 http://localhost:3001/person に対してAPIリクエストを投げます。

このとき、request bodyにはprotobufでencodeしたデータが入っています。


## 使ったライブラリ
protobufを使ったエンコードとデコードには https://github.com/protobufjs/protobuf.js を利用しました。