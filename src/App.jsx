import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const App = () => {
  const [question,setQuestion] = useState(null);
  const [index,setIndex] = useState(0)
  const selectedOptionRef = useRef()
  const [totalMarks,setTotalMarks] = useState(0)
  const [result, setResult] = useState(0)
  const [btn, setBtn] = useState(true);

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
      setBtn(false)
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
    <div className='bg-accent min-h-screen'>
    <h1 className='text-7xl mb-1 text-center mx-96 text-purple-400 font-bold border-solid border-8 border-purple-400 rounded-xl'>QUIZ APP</h1>
      <div className='h-4/5 w-2/4 fixed p-5 mx-80 bg-white rounded-2xl'>
    <h1 className='text-center text-4xl mb-5 underline text-purple-400'>chose the correct Answer</h1>
    {question ?
    <div>
      <h1 className='text-2xl mb-4'>Q{index + 1} : {question[index].question.text}</h1>
      <ul className='mb-4 ml-4' ref={selectedOptionRef}>
        {shuffleArray([...question[index].incorrectAnswers, question[index].correctAnswer]).map((item, index)=>{
          return <li className='mb-4' key={index}>
            <input type="radio" value={item} name='choice' id={item}/>
            <label htmlFor={item}>{item}</label>
          </li>
        })}
      </ul>
      {btn ? <div className="divider divider-accent mt-14">
        <button className="btn btn-outline btn-accent w-20" onClick={nextQuestion}>next</button>
        </div> : false}
      <h1 className='text-center text-4xl mt-7'>Result: {result}/{totalMarks}</h1>
    </div>
    : <h1><span className="loading loading-dots loading-lg"></span></h1>
    }
      </div>
    </div>
    </>
  )
}

export default App