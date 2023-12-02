import React from 'react'
import categories from "./data.jsx"
import blob1 from "./assets/blob-1.png" 
import blob2 from "./assets/blob-2.png" 
import dropdown from "./assets/drop-down.png"

 function Intro(props){

    const [quizOn,setQuiz] = React.useState(false)
    const [categoryObj,setCategoryObj] = React.useState(categories[0])

    const categoryItems = categories.map((item)=> <p  onClick={()=>{
        document.querySelector(".drop-list").classList.remove("display")
        document.querySelector(".proceed").classList.remove("invisible")
        setCategoryObj(item)}} key={item.id} >{item.name}</p>)

    return (
        <div className='box'>
          <img src={blob1} className="blobTop" alt="" />
          {
          !quizOn?<div className='head'>
          <h2>Quizzical</h2>
          <p>The Quizz game</p>
          <button onClick={()=>setQuiz(true)} >Start quiz</button>
          </div>
          :<div className='category-box'>
              <h2>Select Category</h2>
              <div className='select'>
              <button  id=""  onClick={()=>{
                document.querySelector(".drop-list").classList.toggle("display") 
                document.querySelector(".proceed").classList.toggle("invisible")
            }}> <span> <label>{categoryObj.name}</label> <img className='drop-down' src={dropdown}></img></span></button>
              <div className='drop-list'>
                {categoryItems}
              </div>
              </div>
              <button className='proceed' onClick={ async()=>{
                await props.fetchQuiz(categoryObj)
                
            }} >Proceed</button>
          </div>
          }
          <img src={blob2} className="blobBottom" alt="" />
        </div>
        )
}

export default Intro