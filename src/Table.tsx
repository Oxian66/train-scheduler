import { ChangeEvent, useEffect, useState } from "react";
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
  const uri = `https://dark-pear-viper-suit.cyclic.app/`;
  try {
    const responce = await axios.get(uri);
    return responce.data;
  } catch (e: any) {
    throw e;
  }
};

const Table = () => {
  const [incomeData, setIncomeData] = useState<incomeData[]>([]);
  const [displayData, setDisplayData] = useState<incomeData[]>([]);
  const [filter, setFilter] = useState<{
    param?: string,
    condition?: string,
    target?: string
  }>({});

  useEffect(() => {
    fetchData().then((d) => {
      setIncomeData(d);
      setDisplayData(d);
    });
  }, []);

  useEffect(() => {
    let copyData = [...incomeData];
    if (filter.param && filter.condition && filter.target) {
      copyData = copyData.filter(compare);
    }
    setDisplayData(copyData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])
  
  function compare (value: incomeData): boolean {
    // (el) => (
    //   (filter.condition === '=' && true) ||
    //   (filter.condition === '>' && true) ||
    //   (filter.condition === '<' && true)
    // ),
    if (filter.param?.includes('Time')) {
      // eslint-disable-next-line no-eval
      return eval(`${value[filter.param! as keyof incomeData]} ${filter.condition!} ${unstringify(filter.target!)}`);
    } else if (filter.param?.includes('City')) {
      return (value[filter.param! as keyof incomeData] as string).toLowerCase().includes(filter.target!.toLowerCase());
    } else {
      return eval(`${value[filter.param! as keyof incomeData]} ${filter.condition!} ${filter.target!}`);
    }
  }

  function unstringify(val: string): number {
    const timeComponents = val.split(/[-: .]/);
    const minutes = parseInt(timeComponents[1]);
    return parseInt(timeComponents[0]) * 60 + (minutes ? minutes : 0);
  }

  const handleSortSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const copyData: incomeData[] = [...displayData];
    const param: keyof incomeData = e.target.value as keyof incomeData;
    copyData.sort((a, b):number => (a[param] as number) - (b[param] as number))
    setDisplayData(copyData);
  }

  const handleFilterSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    const filterCandidate = { ...filter, [e.target.name]: e.target.value };
    if (e.target.value === 'empty') delete filterCandidate[e.target.name as keyof (typeof filterCandidate)];
    setFilter(filterCandidate);
  }

  const handleFilterInput  = (e:ChangeEvent<HTMLInputElement>) => {
    const filterCandidate: Partial<typeof filter> = { ...filter, target: e.target.value };
    if (e.target.value === '') delete filterCandidate.target;
    setFilter(filterCandidate);
  }

  return (
    <>
      <h1>Расписание поездов</h1>
      <label>
        Сортировать по
        <Select name="users_sort" onChange={handleSortSelectChange}>
          <option value="number">По поездам</option>
          <option value="departureTime">По времени отправления</option>
        </Select>
      </label>
      <Fieldset>
        <legend>Выбирите критерии фильтрации</legend>
        <label>
          Столбец
          <Select name="param" onChange={handleFilterSelect} defaultValue='empty'>
            <option value="number">№ поезда</option>
            <option value="departureCity">Пункт отправления</option>
            <option value="arrivalCity">Пункт назначения</option>
            <option value="departureTime">Время отправления</option>
            <option value="travelTime">Время в пути</option>
            <option value="seatsAvailable">Свободных мест</option>
            <option value="empty"></option>
          </Select>
        </label>
        <label>
          Критерий
          <Select name="condition" onChange={handleFilterSelect} defaultValue='empty'>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="==">=</option>
            <option value="empty"></option>
          </Select>
        </label>
        <label>
          Значение
          <Input type="text" onChange={handleFilterInput} />
        </label>
      </Fieldset>

      <table>
        <TableHeaderEl>
          <tr>
            <th>№ поезда</th>
            <th>Пункт отправления</th>
            <th>Пункт назначения</th>
            <th>Время отправления</th>
            <th>Время в пути</th>
            <th>Свободных мест</th>
          </tr>
        </TableHeaderEl>
        <TableBody>
          {displayData.map((entry) => (
            <Entry key={entry.number} data={entry} />
          ))}
        </TableBody>
      </table>
    </>
  );
};

const TableHeaderEl = styled.thead`
  background: #534D41;
  color: white;
  
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
`;
const Select = styled.select`
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;
const Fieldset = styled.fieldset`
margin-bottom: 10px;
`;
const Input = styled.input`
  margin-left: 5px;
`;
export default Table;
