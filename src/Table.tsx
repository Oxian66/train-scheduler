import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Entry from "./Entry";

export interface incomeData {
  number: number;
  departureCity: string;
  arrivalCity: string;
  departureTime: number;
  travelTime: number;
  seatsAvailable: number;
}

const fetchData = async (query?: string): Promise<incomeData[]> => {
  const uri = `http://192.168.1.128:8765/schedule?${query}`;
  try {
    const responce = await axios.get(uri);
    return responce.data;
  } catch (e: any) {
    throw e;
  }
};

const Table = () => {
  const [data, setData] = useState<incomeData[]>([]);

  useEffect(() => {
    fetchData().then((d) => {
      setData(d);
    });
  }, []);

  const copyData: incomeData[] = [...data];


  return (
    <>
      <h1>Расписание поездов</h1>
      <select name="users_filter">
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select>
      <table>
        <TableHeaderEl>
          <tr>
            <th>N поезда</th>
            <th>Пункт отправления</th>
            <th>Пункт назначения</th>
            <th>Время отправления</th>
            <th>Время в пути</th>
            <th>Свободных мест</th>
          </tr>
        </TableHeaderEl>
        <TableBody>
          {copyData.map((entry) => 
            <Entry key={entry.number} data={entry} />
          )}
        </TableBody>
      </table>
    </>
  );
};

const TableHeaderEl = styled.thead`
  background: #534D41;
  color: white;
  border-right: 1px solid #d3d3d3;
  border-bottom: 2px solid black;
  th {
    padding: 10px;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #F8DFBC;
    
  }

  tr:nth-child(odd) {
    background: #F3A712;
  }
`

export default Table;
