import { useState } from 'react';

function App() {
  let [calculate, setCalculate] = useState('');
  let [active, setActive] = useState('plane');
  let [refueling, setRefueling] = useState('refueling');

  const operations = ['/', '*', '-', '+', '(', ')', '^', '.'];
  let mostRecent = true;

  const update = (val) => {
    for (let i = 0; i < calculate.length; i++) {
      if (calculate[i] === '.') {
        mostRecent = false;
      }
      if (calculate[i] !== '.') {
        if (operations.includes(calculate[i])) {
          mostRecent = true;
        }
      }
    }

    if (mostRecent === false && val === '.') {
      return;
    }

    if (
      (calculate.length === 0 && val === '-') ||
      (calculate.length === 0 && val === '.')
    ) {
      setCalculate(val);
    }

    if (val === '(' && !operations.includes(calculate.slice(-1))) {
      val = '*(';
      setCalculate(calculate + val);
    }

    if (calculate.slice(-1) === '(' && (val === '-' || val === '.')) {
      setCalculate(calculate + val);
    }

    if (
      (operations.includes(calculate.slice(-1)) && val === '(') ||
      (calculate.slice(-1) === ')' && operations.includes(calculate.slice(-1)))
    ) {
      setCalculate(calculate + val);
    } else if (
      (operations.includes(val) && calculate === '') ||
      (operations.includes(val) && operations.includes(calculate.slice(-1)))
    ) {
      return;
    }

    setCalculate(calculate + val);
  };

  const makeNums = () => {
    let nums = [];
    for (let i = 1; i < 10; i++) {
      nums.push(
        <button key={i} onClick={() => update(i.toString())}>
          {i}
        </button>
      );
    }
    return nums;
  };

  const equals = () => {
    if (
      (operations.includes(calculate.slice(-1)) &&
        calculate.slice(-1) !== ')') ||
      calculate.slice(-2) === '()' ||
      calculate.slice(-2).slice(-2, 1) === '('
    ) {
      setCalculate('ERROR');
    }

    if (calculate.length !== 0) {
      setCalculate(eval(calculate.toString()).toString());
      setActive('plane-active');
      setTimeout(() => {
        setRefueling('refueling-active');
      }, 9000);
      setTimeout(() => {
        setActive('plane');
        setRefueling('refueling');
      }, 12000);
    }
  };

  const deleteBtn = () => {
    if (calculate === '') {
      return;
    } else {
      let newVal = calculate.slice(0, -1);
      setCalculate(newVal);
    }
  };

  const clear = () => {
    let newVal = '';
    setCalculate(newVal);
  };

  return (
    <div className="App">
      <div className={active}>
        <div id="banner-text">
          {calculate !== 'ERROR' ? (
            parseFloat(calculate).toFixed(2).length > 12 ? (
              <span>Woah, Big Number!</span>
            ) : (
              parseFloat(calculate).toFixed(2)
            )
          ) : (
            'ERROR'
          )}
        </div>
      </div>

      <div id="calc">
        <div id="disp">{calculate || '0'}</div>
        <div id="operations">
          <button onClick={() => update('/')}>/</button>
          <button onClick={() => update('*')}>*</button>
          <button onClick={() => update('+')}>+</button>
          <button onClick={() => update('-')}>-</button>
          <button onClick={() => update('(')}>(</button>
          <button onClick={() => update(')')}>)</button>
          <button onClick={() => update('**')}>^</button>

          <button onClick={() => deleteBtn()}>Del</button>
          <button onClick={() => clear()}>C</button>
        </div>
        <div id="numbers">
          {makeNums()}
          <button onClick={() => update('0')}>0</button>
          <button onClick={() => update('.')}>.</button>

          <button onClick={() => equals()}>=</button>
        </div>
      </div>
      <div className={refueling}>REFUELING...</div>
    </div>
  );
}

export default App;
