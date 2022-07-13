import React, {useState, useContext, useEffect} from "react";
import {
    LoginDiv,
    LoginTitleTag,
    LoginTitleContainer, UserBooksContainer,
} from "./LoginComponents";
import {apiContext, loginContext} from "../App";
import { Link, Navigate } from "react-router-dom"
import {BookishHeader} from "../BookishNavbar/BookishNavbar";

export function UserPage(props) {
  const [books, setBooks] = useState([]);
  const [output, setOutput] = useState("");
  const [reroute, setReroute] = useState(<p></p>);
  const [username, setUsername] = useState("")

  const apiService = useContext(apiContext)
  const loginService = useContext(loginContext)

  console.log(loginService.user)
  apiService.user_name(loginService.user).then((response) => {
      //console.log(response)
      setUsername(response.user_name)
  })

  let getBooksForUser = () => {
      apiService.user(loginService.user).then((bookResponse) => {
          if (bookResponse === {}) {
              setBooks([])
          } else {
              setBooks(bookResponse.books_for_user)
          }

      })
  }

  useEffect(getBooksForUser, [output])

  let handleAssignment = (event) => {
    event.preventDefault()
    if(loginService.user !== null && event.target[0].value !== "") {
        let current_date = new Date();
        let due_date = new Date(current_date.setMonth(current_date.getMonth() + 1))
        apiService.user_assign(loginService.user, event.target[0].value, due_date.toDateString()).then((response) => {
            if (response.hasOwnProperty("error")) {
                setOutput(response.error)
            } else {
                setOutput(response.message)
            }
        })
    }
  }

  let logout = () => {
      loginService.user = null
      setReroute(<Navigate to="/login" replace={true}/>)
  }

  if(loginService.user == null){
    return(
        <LoginDiv>
            <BookishHeader />
            <LoginTitleContainer>
                <p>Please log in</p>
                <button><Link to={"/login"}>Back to Login Page</Link></button>
                {reroute}
            </LoginTitleContainer>
        </LoginDiv>
    )
  } else {
      return (
          <div>
          <LoginDiv>
              <BookishHeader />
              <LoginTitleContainer>
                  <LoginTitleTag>Hi {username}</LoginTitleTag>

                  <button onClick={logout}>Logout</button>

              </LoginTitleContainer>

              <UserBooksContainer>
                  <p>Your checked out books are:</p>

                  <table>
                      <tr>
                          <th>Book</th>
                          <th>Due Date</th>
                      </tr>


                  {books.map((value, index) => {
                      let due_date_asDate;
                      due_date_asDate = new Date(value.due_date)
                      return (
                          <tr>
                              <td>{value.title}</td>
                              <td>{due_date_asDate.toDateString()}</td>
                          </tr>
                      )
                  })}

                  </table>
            </UserBooksContainer>
          </LoginDiv>

          <LoginDiv>
              <LoginTitleContainer>
                  <p>Check out a new book:</p>

                  <form onSubmit={handleAssignment}>
                      <input type="text" placeholder={"Book ID"}/>
                      <input type="submit"/>
                  </form>

                  <p>{output}</p>

                  {reroute}

              </LoginTitleContainer>
          </LoginDiv>
          </div>
      );
  }
}