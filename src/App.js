import Wrapper from './Components/Wrapper';
import Screen from './Components/Screen';
import ButtonBox from './Components/ButtonBox';
import Button from './Components/Button';
import React, { useState } from 'react';
import './App.css';

const calcValues = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'X'],
  ['1', '2', '3', '-'],
  ['0', '.', '%', '+'],
  ['C', '=']
];

const App = () => {  
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0
  });

  //TODO
  const handleKeyDown = (e) =>{    
    console.log(e.key);
  };

  const numClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if(value.length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === '0'
            ? '0'
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
        res: !calc.sign ? 0 : calc.res
      });
    }
  };
  
  const pointClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    });
  }
  
  const signClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    });
  }
  
  const equalsClickHandler = (e) =>{
    if(calc.sign && calc.num){
      const math = (a, b, sign) =>
        sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === 'X'
          ? a * b
          : a / b;
      
      setCalc({
        ...calc,
        res:
          calc.num === '0' && calc.sign === '/'
            ? "Error"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: '',
        num: 0
      });
    }
  }
  
  const percentClickHandler = (e) =>{
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: ''
    });
  }
  
  const resetClickHandler = (e) =>{
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0
    });
  }

  return (
    <div className="App">
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {
            calcValues.flat().map((button, index) => {
              return (
                <Button
                  key={index}
                  className={button === '=' ? 'Equals' : ''}
                  value={button}
                  onClick={
                    button === 'C'
                      ? resetClickHandler
                      : button === '%'
                      ? percentClickHandler
                      : button === '='
                      ? equalsClickHandler
                      : button === '/' || button === 'X' || button === '-' || button === '+'
                      ? signClickHandler
                      : button === '.'
                      ? pointClickHandler
                      : numClickHandler
                  }
                  onKeyPress={handleKeyDown}
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;