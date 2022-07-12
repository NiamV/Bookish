import styled from "styled-components";

export const SearchFormContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  
  input:focus {
    outline: none;
  }
`

export const BookSearchBar = styled.input`
  margin: 1.5em 0 1em 0;
  border: none;
  border-bottom: 1px solid #362f2e;
  text-align: center;
  padding: 1em 1em 0.4em 1em;
  font-size: 1em;
`;

export const BookRadio = styled.input`
  margin: 0.2em 0.5em;
  border: 15em solid red;
  border-radius: 50%;
`

export const BookSubmit = styled.input`
  margin: 1em;
  width: 5em;
  height: 5em;
  transition: transform 0.5s;
  padding: 1em;
  &:hover {
    cursor: pointer;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    transition: transform 0.5s;
    filter: invert(51%) sepia(91%) saturate(2081%) hue-rotate(158deg) brightness(90%) contrast(102%);
  }
`