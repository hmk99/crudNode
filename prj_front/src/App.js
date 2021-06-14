import {useState,useEffect} from 'react'
import './style/App.css';
import Axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactPaginate from 'react-paginate'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

function App() {

  const[todos,setTodos]= useState([]);
  const[todo,setTodo]= useState('')
  const[newTodo,setNewTodo]= useState('');
  const[pageNum,setPageNum]= useState(0)

  

  const todoPerPage= 5
  const pageVis= pageNum*todoPerPage
	
  const[search,setSearch]= useState('')
  

  /*
  const [prod,setprod]= useState(
    {
      name: "react from fb",
      price: 10,
      productBy: "FB"
    }
    )

  const makePay= token => {
    const body= {
      token,
      prod
    }

    const headers= {
      "Content-Type": "application/json"
    }

    return fetch(`http://locallhost:3030`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(res =>{
      console.log('RESP',res);
      const {status}= res;
      console.log('status',status);
    })
    .catch(err=>{
      console.log(err)
    })
  }
  */
 /*
  const addPers= ()=>{
    Axios.post("http://localhost:3030/create", {nom: nom, prenom: prenom, age: age}
  ).then(()=>{
    console.log('SUCCESS')
  })

}
*/
const addTodo= ()=> {
  Axios.post("http://localhost:3030/create", {todo: todo})
  .then(()=> {
    setTodos([...todo,todo])
  })
}

useEffect(() => {
  Axios.get("http://localhost:3030/todo").then((res)=> {
    setTodos(res.data)
    console.log(res.data)
  })
},[]);

const delTodo= (id)=> {
  Axios.delete(`http://localhost:3030/delete/${id}`).then((res)=>{
    setTodos(
      todos.filter((val)=>{
        return val.id != id;
      })
    )
  })
}


const updateTodo = (id) => {
  Axios.put("http://localhost:3030/update", {todo: newTodo, id:id}).then(
    (response) => {
      setTodos(
        todos.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                todo: newTodo
              }
            : val;
        })
      );
    }
  );
  setNewTodo('jjjj')
};



  /*const getpers=()=> {
    Axios.get("http://localhost:3030/pers").then((res) =>{
      setpers(res.data)
      console.log(res.data)
    })
  }

  const deletepers = (id) => {
    Axios.delete(`http://localhost:3030/delete/${id}`).then((response) => {
      setpers(
        pers.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  
  const updatepers = (id) => {
    Axios.put("http://localhost:3030/update", {age: newage, id: id }).then(
      (response) => {
        setpers(
          pers.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  nom: val.nom,
                  prenom: val.prenom,
                  age: newage,
                }
              : val;
          })
        );
      }
    );
  };
  */

  const pageCount = Math.ceil(todos.length / todoPerPage)
  const pageChange = ({selected})=>{
    setPageNum(selected)
  }

  const displayTodo= todos.slice(pageVis,pageVis + todoPerPage)
  .map((val)=> {
    return (
      <div className="todo">
          <h3>*) {val.todo}</h3>
          <TextField id='field' label="Update TODO" variant="outlined" type="text" onChange={(e)=>{setNewTodo(e.target.value)}}/>
          <div className="btn">
            <Button variant="contained" color="secondary" id='upd' onClick={()=>{updateTodo(val.id)}}>Update</Button>
              <Button variant="contained" id='del' onClick={()=>{delTodo(val.id)}}>Delete</Button>
          </div>
      </div>
    )
  })

  const searchENG=()=> {
    todos.filter((val)=> {
      if(search== ""){
        return val
      }else if(val.toLowerCase().includes(search.toLowerCase())){
        return val
      }
    })
  }
  return (
    <div className="App">
      <div className="head">
        <h1>
          TODO MySQLERN
        </h1>
        <form action="">
          <TextField id='field' label="Add TODO" variant="outlined" type="text" onChange={(e)=>{setTodo(e.target.value)}} />
          <Button variant="contained" color="primary" type="submit" id='ok' onClick={addTodo}>Confirm</Button>
        </form>
        <br />
        <form action="" className="search_form">
          <InputBase id="search_input"
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e)=>{setSearch(e.target.value)}}
          />
          <IconButton type="submit" onClick={()=> {searchENG()}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
        <br />
      </div>
      <br />
      <div className="todos">
        {
          displayTodo
        }
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          activeClassName={"pagintationActive"}
          disabledClassName={"pagintationDisabled"}
        />
        <br />
      </div>
    </div>
  );
}

export default App;
