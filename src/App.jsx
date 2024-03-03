import { useEffect, useState } from 'react'
import axios from 'axios'

// const server_url = 'http://localhost:3000/todo' 
const server_url = 'https://devpia-devpia.koyeb.app/todo'
function App() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = async ()=>{
    const res = await axios.get(server_url);
    console.log(res.data);
    setTodoList(res.data);

    // fetch(server_url).then((response)=>{response.json()}).then((data)=> setTodoList(data));
  };

  useEffect(()=>{
    fetchData();
  } , [] );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    await axios.post(server_url,{text,done});
    await fetchData();

    // fetch(server_url,{
    //   method:'POST',
    //   headers:{'Content-Type':'application/json',},
    //   body:JSON.stringify({ text, done, }),
    // }).then(()=>fetchData());
  }
  
  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={onSubmitHandler}>
        <input name='text'/>
        <input name='done' type='checkbox'/>
        <input type='submit' value='추가'/>
      </form>

      {todoList?.map((todo)=>(
        <div key={todo.id} style={{display:'flex'}}>
          <div> {todo.id} </div>
          <div> {todo.text} </div>
          <div> {todo.done ? "Y" : "N"} </div>
        </div>
      ))}
    </>
  );
}

export default App
