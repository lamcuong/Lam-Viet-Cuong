import React, { useEffect, useState } from "react";
import "./App.css";
import { tokens } from "./data";
import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import STEVMOS from "./assets/stevmos";
import { SwapOutlined } from "@ant-design/icons";
import BNEO from "./assets/bneo";
import BLUR from "./assets/blur";
import BUSD from "./assets/busd";
import USD from "./assets/usd";
import ETH from "./assets/eth";
import GMX from "./assets/gmx";
import LUNA from "./assets/luna";
import RATOM from "./assets/ratom";
import STRD from "./assets/strd";
import EVMOS from "./assets/evmos";
import IBCX from "./assets/ibcx";
import IRIS from "./assets/iris";
import AMPLUNA from "./assets/ampluna";
import KUJI from "./assets/kuji";
import STOSMO from "./assets/stosmo";
import AXLUSDC from "./assets/axlusdc";
import ATOM from "./assets/atom";
import STATOM from "./assets/statom";
import OSMO from "./assets/osmo";
import RSWTH from "./assets/rswth";
import STLUNA from "./assets/stluna";
const iconMap = {
  BLUR: <BLUR />,
  bNEO: <BNEO />,
  BUSD: <BUSD />,
  USD: <USD />,
  ETH: <ETH />,
  GMX: <GMX />,
  STEVMOS: <STEVMOS />,
  LUNA: <LUNA />,
  RATOM: <RATOM />,
  STRD: <STRD />,
  EVMOS: <EVMOS />,
  IBCX: <IBCX />,
  IRIS: <IRIS />,
  ampLUNA: <AMPLUNA />,
  KUJI: <KUJI />,
  STOSMO: <STOSMO />,
  axlUSDC: <AXLUSDC />,
  ATOM: <ATOM />,
  STATOM: <STATOM />,
  OSMO: <OSMO />,
  rSWTH: <RSWTH />,
  STLUNA: <STLUNA />,
};
function App() {
  const [fromToken, setFromToken] = useState<string>(tokens[0].currency);
  const [toToken, setToToken] = useState<string>(tokens[1].currency);

  const [inputValue, setInputValue] = useState({
    fromAmount: 0,
    toAmount: 0,
  });

  const convertCurrency = (amount: number, inputName?: string) => {
    const fromPrice = tokens.find((token) => token.currency === fromToken).price;
    const toPrice = tokens.find((token) => token.currency === toToken).price;
    let exchangeRate;
    switch (inputName) {
      case "fromAmount":
        exchangeRate = fromPrice / toPrice;
        break;
      case "toAmount":
        exchangeRate = toPrice / fromPrice;
        break;
      default:
        exchangeRate = fromPrice / toPrice;
        break;
    }
    return amount * exchangeRate;
  };

  const onSwapCurrency = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };
  const recalculate = () => {
    setInputValue((prev) => ({ ...prev, toAmount: convertCurrency(inputValue.fromAmount) }));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    switch (name) {
      case "fromAmount":
        setInputValue({ fromAmount: Number(value), toAmount: convertCurrency(Number(value), name) });
        break;
      case "toAmount":
        setInputValue({ fromAmount: convertCurrency(Number(value), name), toAmount: Number(value) });
        break;
    }
  };

  useEffect(() => {
    recalculate();
  }, [fromToken, toToken]);
  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <h1>Currency Swap</h1>
      <div style={{ maxWidth: "70%", margin: "auto", marginTop: "50px" }}>
        <Row gutter={20}>
          <Col span={7}>
            <Input
              type="number"
              size="large"
              name="fromAmount"
              value={inputValue.fromAmount}
              placeholder="Amount to send"
              onChange={handleAmountChange}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              dropdownStyle={{ width: "200px" }}
              value={fromToken}
              onChange={(value) => {
                setFromToken(value);
              }}
              size="large"
              options={tokens.map((item) => ({
                label: (
                  <div className="select">
                    {iconMap[item.currency]}
                    {item.currency}
                  </div>
                ),
                value: item.currency,
              }))}
            />
          </Col>
          <Col span={1} style={{ padding: 0 }}>
            <Button onClick={() => onSwapCurrency()} icon={<SwapOutlined />} size="large" />
          </Col>
          <Col span={7}>
            <Input
              type="number"
              size="large"
              name="toAmount"
              onChange={handleAmountChange}
              value={inputValue.toAmount}
              placeholder="Amount to receive"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              dropdownStyle={{ width: "200px" }}
              value={toToken}
              onChange={(value) => {
                setToToken(value);
              }}
              size="large"
              options={tokens.map((item) => ({
                label: (
                  <div className="select">
                    {iconMap[item.currency]}
                    {item.currency}
                  </div>
                ),
                value: item.currency,
              }))}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
