import React, {Component} from 'react';

import './styles/App.css';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            total: 0,
            operator: '',
            firstOperand: '',
            secondOperand: '',
            firstOp: true
        }
    }

    calculateTotal = (num1, num2, operation) => {
        let calc = {
            '+': (num1, num2) => parseFloat(num1) + parseFloat(num2),
            '-': (num1, num2) => parseFloat(num1) - parseFloat(num2),
            '*': (num1, num2) => parseFloat(num1) * parseFloat(num2),
            '/': (num1, num2) => parseFloat(num1) / parseFloat(num2)
        };

        return calc[operation](num1, num2);
    }

    addToBuffer = (e, type, option) => {
        if(type === 1 && this.state.firstOp){
            this.setState({firstOperand: this.state.firstOperand + option});
        }else if(type === 1 && !this.state.firstOp){
            this.setState({secondOperand: this.state.secondOperand + option});
        }

        if(type === 2 && this.state.firstOp && this.state.firstOperand !== ''){
            this.setState({
                operator: option,
                firstOp: false
            });
        }else if(type === 2 && !this.state.firstOp && this.state.secondOperand !== ''){
            let num1 = this.state.firstOperand;
            let num2 = this.state.secondOperand;
            let operation = this.state.operator;
            let total = this.calculateTotal(num1, num2, operation);

            this.setState({
                firstOperand: total,
                secondOperand: '',
                total: total,
                operator: option
            });
        }

        if(type === 3){
            this.setState({
                total: 0,
                operator: '',
                firstOperand: '',
                secondOperand: '',
                firstOp: true
            });
        }

        if(type === 4 && !this.state.firstOp && this.state.secondOperand !== ''){
            let total = this.calculateTotal(this.state.firstOperand, this.state.secondOperand, this.state.operator);

            this.setState({
                total: total,
                firstOperand: total,
                firstOp: true,
                secondOperand: '',
                operator: ''
            });
        }
    }

    componentDidUpdate = (state, props) => {
        console.log('First Num: ' + this.state.firstOperand);
        console.log('Second Num: ' + this.state.secondOperand);
        console.log('Total: ' + this.state.total);
    }

    render(){
        return (
            <div>
                <header>
                    <h2>Calculator App</h2>
                </header>
                <div className="calcContainer">
                    <div className="displayBox">
                        <p>&gt; {this.state.firstOperand}</p>
                        <p>&gt; {this.state.operator}</p>
                        <p>&gt; {this.state.secondOperand}</p>
                        <p>Total: {this.state.total}</p>
                    </div>
                    <div className="calcButtons">
                        <div className="numbers">
                            <button onClick={(e) => this.addToBuffer(e, 1, '7')}>7</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '8')}>8</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '9')}>9</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '4')}>4</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '5')}>5</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '6')}>6</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '1')}>1</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '2')}>2</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '3')}>3</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '0')}>0</button>
                            <button onClick={(e) => this.addToBuffer(e, 1, '.')}>.</button>
                        </div>
                        <div className="operators">
                            <button onClick={(e) => this.addToBuffer(e, 2, '+')}>+</button>
                            <button onClick={(e) => this.addToBuffer(e, 2, '-')}>-</button>
                            <button onClick={(e) => this.addToBuffer(e, 2, '*')}>*</button>
                            <button onClick={(e) => this.addToBuffer(e, 3, 'AC')}>AC</button>
                            <button onClick={(e) => this.addToBuffer(e, 2, '/')}>/</button>
                            <button onClick={(e) => this.addToBuffer(e, 4, '=')}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App
