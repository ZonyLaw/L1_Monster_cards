import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.components';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [stringField, setStringField] = useState('');
  
  console.log("render");

  useEffect(()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then((users)=>setMonsters(users));
  }, []);

  
  const onSearchChange = (event) => {   
          const searchFieldString = event.target.value.toLocaleLowerCase();
          setSearchField(searchFieldString);
  }
  const onStringChange = (event)=>{
    setStringField(event.target.value);
  }

  
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
    console.log('effect is firing')
  }, [monsters, searchField]);
  

  // console.log(filteredMonsters);
  return(
    <div className="App">
      <h1 className="app-title">Monster List</h1>
      <SearchBox 
          className={"monsters-search-box"}
          onChangeHandler={onSearchChange} 
          placeHolder={"search monsters"}
          />
      {/* <SearchBox 
          onChangeHandler={onStringChange} 
          placeHolder={"set string"}
          /> */}

          <CardList monsters={filteredMonsters} />
      </div>
      
  )
}

// class App extends Component {

//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
    
//   }

//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then((users)=>this.setState(
//           ()=>{
//             // console.log(users)
//             return {monsters: users};
//           },
//           ()=>{
//             console.log(this.state);
//           }
//           ));
//   }

//   onSearchChange = (event) => {   
//       // console.log("origin", {startArray: this.state.monsters})
//       const searchField=event.target.value.toLocaleLowerCase();
//       this.setState(
//         ()=>{
//           return {searchField: searchField};
//       })
//   }

//   render() {

//     const{ monsters, searchField } = this.state;
//     const{ onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//       <h1 className="app-title">Monster List</h1>
//         <SearchBox 
//           className={"monsters-search-box"}
//           onChangeHandler={onSearchChange} 
//           placeHolder={"search monsters"}
//           />

//       {/* {filteredMonsters.map((monster) => {
//           return (
//             <div key={monster.id}>
//              <h1>{monster.name}</h1>
//             </div>
//           )
//           })}; */}
//        <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
  
// }

export default App;
