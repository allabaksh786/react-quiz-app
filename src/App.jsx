
import React from 'react'
import Intro from "./Intro.jsx"
import Quiz from "./Quiz.jsx"

function App() {
  const [theQuiz,setTheQuiz] = React.useState([])
  const [render,setRender] = React.useState(false)

   function fetchQuiz(category){
    document.querySelector(".box").style.display = "none";
    document.querySelector(".loader").classList.remove("hide");
    let url
    if(category.id == 0){
       url = "https://opentdb.com/api.php?amount=5"
    }
    else{
      // console.log(category.id)
      url = `https://opentdb.com/api.php?amount=5&category=${category.id}`
    } 
      fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data)
        setTheQuiz((prev)=>  [...prev,...data.results])
        setRender(!render)
      })
      .then(()=>{document.querySelector(".loader").classList.add("hide");})
    }
  // console.log(theQuiz)
return(
  <div className='container' >
      <div className='loader hide'></div>
    {
    !render?
    <Intro fetchQuiz={fetchQuiz} />
    :<Quiz quiz={theQuiz} />
    }
      </div>
)

  

}

export default App
