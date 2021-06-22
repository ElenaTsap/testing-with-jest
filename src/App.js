import logo from './logo.svg';
import './App.css';
import { Hello } from './components/hello/Hello'
import { Sum } from './components/sum/Sum'
import Toggle from './components/toggle/Toggle'
import Card from './components/card/Card'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name='Eleni'/>
        <Sum/>
        <Sum a={4} b={3}/> 
        <Toggle onChange = {val => val}/>
        <Card onSelect = {(choice)=> console.log(choice)}/>
      </header>
    </div>
  );
}

export default App;
