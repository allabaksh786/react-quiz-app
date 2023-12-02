import React from 'react'
import blob1 from "./assets/blob-1.png" 
import blob2 from "./assets/blob-2.png" 
import "./quiz.css"
import Question from './Question'
import {v4 as uuidv4} from 'uuid';

export default function Quiz(props){

    const options = ["","","","",""]

    let gameOver = false

    const org_answers = props.quiz.map( item =>item.correct_answer)    
    const answers = props.quiz.map( item => btoa(item.correct_answer).replaceAll("=",""))    
    // console.log(org_answers)
    // console.log(answers)
    function changeColor(event){
        let Ele = event.target;
        let index = Ele.dataset.question;
        let selectedOption = Ele.dataset.option;
        if(selectedOption === options[index]){
            Ele.classList.remove('selected')
            options[index] = ""
        }
        else{
            if(options[index]!=""){
                // Reason for using idnetifier: If we get questions that have answers like true or false more than one
                // then the problem arises, if we try to get the elements by their options, both will
                // have the same data attribute. 
                let identifier = options[index]+index;
                console.log(identifier)
                console.log(document.querySelector(`[data-option=${options[index]}]`))
                document.querySelector(`[data-identifier=${identifier}]`).classList.remove('selected')
            }
            Ele.classList.add('selected')   
            options[index] = selectedOption
        }
        const button = document.querySelector(".check")
        if(options.every((item)=> item!="") == false)
        {
            button.disabled = true
        }
            else{
                button.disabled = false;
                button.classList.remove('disabled')
            }
    }   

    let count = -1;
    const theElements = props.quiz.map((item)=>{
        count++;
        return < Question key={uuidv4()} item={item} changeColor ={changeColor} count={count} gameOver={gameOver}/>
    })

    function checkAnswers(){

            console.log(answers)
            console.log(options)
        document.querySelectorAll(".default").forEach((item)=> {
            item.classList.add("grey")
            item.classList.remove("selected")
            item.disabled = true;
    })
        let count = 0;
        for(let i =0;i<answers.length;i++){
            let targetItem = document.querySelector(`[data-identifier="${options[i]+i}"]`);
            if(options[i] != answers[i]){
                targetItem.classList.add("wrong-answer")
            }else{
                count++;
            }
            document.querySelector(`[data-identifier="${answers[i]+i }"]`).classList.add("correct-answer")
            document.getElementById('result').classList.remove("hide")
            document.getElementById('result').classList.add("result")
            document.querySelector('.check').classList.add("hide")
            document.getElementById("result-text").innerText = `You Scored${count}/5`
    }
    }

    return (
        <div className='box'>
          <img src={blob1} className="blobTop-quiz" alt="" />
          <div className='question-box'>
                {theElements}
          </div>
          <div className='button'>
                <button className='check disabled' onClick={checkAnswers} >Check answers</button>
                <div className='hide' id='result'>
                <p id='result-text'></p>
                <button className='check' onClick={()=>location.reload()}>Play again</button>
                </div>
          </div>
          <img src={blob2} className="blobBottom-quiz" alt=""  />
        </div>
    )
}