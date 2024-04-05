"use client"

import "@/customBlocks/customBlocks"
import React, { useState, CSSProperties, useEffect } from "react";
import { BlocklyWorkspace, useBlocklyWorkspace } from "react-blockly";
import Blockly, { JavaScript } from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import Axios from "axios";
import { colour } from "blockly/blocks";

async function GetRound(xml: string, rounds: number) {

  const response = await Axios.post(`http://localhost:8000/play`, {
    size: rounds,
    xml: xml
  })
  return response.data
}

class RoundResponse {
  constructor() {
    this.Moves = { 0: [], 1: [] };
    this.Scores = { 0: [], 1: [] };
  }

  Moves: { 0: number[], 1: number[] };
  Scores: { 0: number[], 1: number[] };
}

function MoveSymbol(props: { move: number }): React.JSX.Element {
  switch (props.move) {
    case 0:
      return <span style={{ color: "#f00" }}>☒</span>
    default:
      return <span style={{ color: "#0f0" }}>🗹</span>
  }
}

function Home() {
  const [xml, setXml] = useState("");
  const [data, setData] = useState(new RoundResponse());
  const [dataRounds, setDataRounds] = useState(1);
  const [rounds, setRounds] = useState(10);

  useEffect(() => {
    setDataRounds(data.Moves[0].length)
  }, [data])
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

  return (
    <>
      <div className="page">
        <BlocklyWorkspace
          toolboxConfiguration={toolboxCategories}
          initialXml={initialXml}
          className="workspace"
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
            move: {
              drag: true,
              scrollbars: false,
            },
            horizontalLayout: true,
            css: true
          }}
          onXmlChange={setXml}
        />
        <table className="resultsBox">
          <tr className="settings">
            <td id="playButtonTd">
              <button className="sendButton bg-sky-500 text-white font-bold" id="sendButton" onClick={async () => {
                setData(await GetRound(xml, rounds))
              }}>PLAY</button>
            </td>
            <td>
              <input type="number" id="rounds_number" placeholder="ROUNDS" onInput={
                (e) => {
                  let value = (document.getElementById("rounds_number") as HTMLInputElement).value
                  setRounds(parseInt(value))
                }
              } />
            </td>
          </tr>
          <tr className="gameResults" style={{ fontSize: `${Math.min(22 / Math.max(dataRounds, 6), 4)}rem` }} suppressHydrationWarning>
            <td suppressHydrationWarning>
              {
                data.Moves[0].map((move, i) => [move, data.Moves[1][i]]).map((e, i) =>
                  <p key={i}>
                    <span>{data.Scores[0][i]} &nbsp;</span>
                    <MoveSymbol move={e[0]} />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <MoveSymbol move={e[1]} />
                    <span>&nbsp; {data.Scores[1][i]}</span>
                  </p>
                )
              }
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default Home