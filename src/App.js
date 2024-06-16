import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'

const protobuf = require("protobufjs");

function App() {
  /** BackendのAPIにpostする*/
  async function postBinaryData(data) {
    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3001/person", true);
    req.setRequestHeader('content-type', 'application/octet-stream');
    req.send(data);
  }



  /** protobufを利用してデータをbinary形式にencodeする */
  async function encodeData(payload) {
    const buffer = protobuf.load("./person.proto")
      .then((root) => {
        // Obtain a message type
        const BasicPerson = root.lookupType("personpackage.BasicPerson");

        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        const errMsg = BasicPerson.verify(payload);
        if (errMsg)
          throw Error(errMsg);

        // Create a new message
        let data = BasicPerson.create(payload);

        // Uint8Array (browser) or Buffer (node)形式にデータをencode
        const encodedData = BasicPerson.encode(data).finish();

        // debug: decoode確認用
        const decodedData = BasicPerson.decode(encodedData);
        console.log(encodedData)
        console.log(decodedData)


        return encodedData

      }).catch((err) => {
        throw err;
      })
    return buffer
  }



  useEffect(() => {
    const getData = async () => {
      // Exemplary payload: 今回は確認用に固定値で設定
      const payload = { name: "Tokyo Taro", age: 120, email: "test@example.com" };

      // protobufを利用してbinary形式にencode
      const encodedData = await encodeData(payload);
      // backendのAPIにencodeしたデータをpostする
      await postBinaryData(encodedData)
    };
    getData(); //関数の実行
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
