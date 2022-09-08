import React from 'react';
import './App.css';
import Table from './Table';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <Wrapper>
      <table>
        <Table />
      </table>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
`;

export default App;
