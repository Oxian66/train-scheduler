import { useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

interface incomeData {
  number: number;
  departureCity: string;
  arrivalCity: string;
  departureTime: number;
  travelTime: number;
  seatsAvailable: number;
}



const fetchData = async (query?:string): Promise<incomeData[]> => {
  const uri = `http://192.168.1.128:8765/schedule?${query}`;
  try {
    const responce = await axios.get(uri);
    return responce.data;
  }
  catch (e: any) {
    throw(e); 
  }
  
};

const Parser = () => {
  const [data, setData] = useState<incomeData[]>([]);

  useEffect(() => {
    fetchData().then((d) => {setData(d);});
  }, []);

  const copyData: incomeData[] = [...data];

  return (
    <tbody>
      {copyData.map((entry) => {
        const trainNumber =
          entry.number.toString().length < 3
            ? entry.number.toString().padStart(3, "0")
            : entry.number;
        const formatTime = (time: number) => {
          const hours = Math.floor(time / 60);
          const minutes = time % 60;

          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
        };

        return (

          <tr>
            <td>{trainNumber}</td>
            <td>{entry.departureCity}</td>
            <td>{entry.arrivalCity}</td>
            <td>{formatTime(entry.departureTime)}</td>
            <td>{formatTime(entry.travelTime)}</td>
            <td>{entry.seatsAvailable}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

const TBody = styled.tr`
  
`


export default Parser;