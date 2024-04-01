"use client"

import "@/customBlocks/customBlocks"
import React, { useState } from "react";
import { BlocklyWorkspace, useBlocklyWorkspace } from "react-blockly";
import Blockly, { JavaScript } from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import Axios from "axios";

async function SendXML(xml: string) {
  const response = await Axios.post(`http://localhost:8000/xml`, {
    xml: xml
  })
  console.log(response.data)
}

function Home() {
  const [xml, setXml] = useState("");
  //const [javascriptCode, setJavascriptCode] = useState("");

  const initialXml = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Logic",
        colour: "#5C81A6",
        contents: [
          {
            kind: "block",
            type: "controls_if",
          },
          {
            kind: "block",
            type: "logic_compare",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: "#5CA65C",
        contents: [
          {
            kind: "block",
            type: "math_round",
          },
          {
            kind: "block",
            type: "math_number",
          },
          {
            kind: "block",
            type: "operations",
          },
        ],
      },
      {
        kind: "category",
        name: "Custom",
        colour: "#5CA699",
        contents: [
          {
            kind: "block",
            type: "round",
          },
          {
            kind: "block",
            type: "betray",
          },
          {
            kind: "block",
            type: "rely",
          },
          {
            kind: "block",
            type: "plmoves",
          },
          {
            kind: "block",
            type: "opmoves",
          },
          {
            kind: "block",
            type: "return_move",
          },
        ],
      },
    ],
  };

  /* function workspaceDidChange(workspace: any) {
    //const code = Blockly.JavaScript.workspaceToCode(workspace);
    const code = javascriptGenerator.workspaceToCode(workspace)
    setJavascriptCode(code);
  } */

  return (
    <>
      <BlocklyWorkspace
        toolboxConfiguration={toolboxCategories}
        initialXml={initialXml}
        className="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        onXmlChange={setXml}
      />
      <pre id="generated-xml">{xml}</pre>
      <button className="sendButton bg-sky-500 text-white font-bold" id="sendButton" onClick={async () => { await SendXML(xml) }}>Send</button>
    </>
  );
}

export default Home