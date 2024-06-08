import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const App = () => {
  const [question,setQuestion] = useState(null);
  const [index,setIndex] = useState(0)
  const selectedOptionRef = useRef()
  const [totalMarks,setTotalMarks] = useState(0) 
  const [result, setResult] = useState(0)

// get questions through api
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
    .then((res)=>{
      console.log(res.data);
      setQuestion(res.data)
      setTotalMarks(res.data.length * 10)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

// next question
  const nextQuestion = ()=>{

    // checking values
    const selectedOption = selectedOptionRef.current.querySelector('input:checked');
    console.log(selectedOption.value);
    if (question[index].correctAnswer === selectedOption.value) {
      console.log("answer is correct");
      setResult(result + 10)
    } else {
      console.log("answer is wrong");
    } 

    if (index < question.length - 1) {
      setIndex(index + 1);
    } else {
      console.log('question khtm');
    }
  }

//shuffle array
  function shuffleArray(arr) {
    let newArr = arr.slice();
    
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    
    return newArr;
}
  
  return (
    <>
    <h1>QUIZ APP</h1>
    <h2>Total marks: {result}/{totalMarks}</h2>
    {question ? 
    <div>
      <h1>Q{index + 1} : {question[index].question.text}</h1>
      <ul ref={selectedOptionRef}>
        {shuffleArray([...question[index].incorrectAnswers, question[index].correctAnswer]).map((item, index)=>{
          return <li key={index}>
            <input type="radio" value={item} name='choice'/>
            <label htmlFor="">{item}</label>
          </li>
        })}
      </ul>
      <button onClick={nextQuestion} disabled={index >= question.length - 1}>next</button>
    </div>
    : <h1>loooding</h1>
    }
    </>
  )
}

export default App