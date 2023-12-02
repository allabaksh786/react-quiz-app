import React from 'react'
import {v4 as uuidv4} from 'uuid';

export default function Question(props){

    const parseEntities = txt => new DOMParser().parseFromString(txt, 'text/html').body.innerText;

    function shuffle(array){
        let randomIndex 
            for(let index =0;index<array.length;index++){
            randomIndex =  Math.floor(Math.random()*array.length)
            let temp = array[randomIndex]
            array[randomIndex] = array[index]
            array[index] = temp
        }
        return array
    }
        let options = [...props.item.incorrect_answers]
        options.push(props.item.correct_answer)
        shuffle(options)

        const optionElements = options.map((option)=>{ 
            return <button className='default' key={uuidv4()} onClick={(event)=>{
                if(!props.gameOver)props.changeColor(event)}} data-identifier={btoa(option).replaceAll("=","")+props.count} data-question={props.count} data-option={btoa(option).replaceAll("=","")} >{parseEntities(option)}</button>
         })

        return (<div className='question-container'> 
        <p className='question'  >{parseEntities(props.item.question)}</p>
        <div className='flex'>
            {optionElements}
        </div>
        <hr />
</div>)

}