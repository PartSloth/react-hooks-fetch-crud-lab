import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions => setQuestions(questions))
  }, [])

  function handleNewQuestion(newQuestion) {
    const updatedArray = [...questions, newQuestion]
    setQuestions(updatedArray);
  }

  function handleDeletedQuestion(deletedQuestion) {
    const updatedArray = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedArray);
  }
  
  function handleUpdatedQuestion(updatedQuestion) {
    const updatedArray = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    })
    setQuestions(updatedArray)
    console.log(updatedArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion}/> : <QuestionList questionsArray={questions} onDeleteQuestion={handleDeletedQuestion} onUpdateQuestion={handleUpdatedQuestion} />}
    </main>
  );
}

export default App;
