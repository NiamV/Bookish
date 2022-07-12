import React, { Component, useState } from "react";
import {
  LoginDiv,
  LoginTitleTag,
  LoginTitleContainer,
} from "./LoginComponents";

export function LoginPage(props) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [output, setOutput] = useState("");

  let showBooksforUser = () => {
    console.log(user)
    props.apiService.user(user).then((bookResponse) => {
      if (bookResponse === {}) {
        setBooks([])
      } else {
        setBooks(bookResponse.books_for_user)
      }

    })
  }

  let handleLogin = (event) => {
    event.preventDefault()
    props.apiService.isUser(event.target[0].value).then((response) => {
        if(response.result){
            setUser(event.target[0].value)
            setOutput("")
        } else {
            setOutput("User does not exist, please register")
        }
    })

  }

  let handleAssignment = (event) => {
    event.preventDefault()
    if(user != null && event.target[0].value != "") {
        let current_date = new Date();
        let due_date = new Date(current_date.setMonth(current_date.getMonth() + 1))
        props.apiService.user_assign(user, event.target[0].value, due_date.toDateString()).then((response) => {
            // console.log(response)
            if (response.hasOwnProperty("error")) {
                setOutput(response.error)
            } else {
                setOutput(response.message)
            }
        })
    }
  }

  let logout = () => {
      setUser(null)
    }

  return (
      <LoginDiv>
        <LoginTitleContainer>
            <LoginTitleTag>Login Page</LoginTitleTag>

            <form onSubmit={handleLogin}>
              <input type="text" placeholder={"Library Card Number"} />
              <input type="submit"/>
            </form>

            <button onClick={logout}>Logout</button>

            <p> {user} is logged in</p>

            <button onClick={showBooksforUser}>Get your books</button>

            {books.map((value, index) => {
                let due_date_asDate;
                due_date_asDate = new Date(value.due_date)
                return <p key="{value.title}">{value.title} due: {due_date_asDate.toDateString()}</p>
            })}

            <form onSubmit={handleAssignment}>
              <input type="text" placeholder={"Book ID"} />
              <input type="submit"/>
            </form>

            <p>{output}</p>

        </LoginTitleContainer>
      </LoginDiv>
  );
}