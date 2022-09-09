import { FC } from "react";
import { incomeData } from "./Table";
import styled from "styled-components";

interface Props {
  data: incomeData;
}

const Entry: FC<Props> = (props: Props) => {
  const trainNumber =
    props.data.number.toString().length < 3
      ? props.data.number.toString().padStart(3, "0")
      : props.data.number;

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TR className={`${props.data.departureTime % 60 < 30 ? "green" : "blue"} ${props.data.seatsAvailable < 20 ? "red" : ""}`}>
      <td>{trainNumber}</td>
      <td>{props.data.departureCity}</td>
      <td>{props.data.arrivalCity}</td>
      <td>{formatTime(props.data.departureTime)}</td>
      <td>{formatTime(props.data.travelTime)}</td>
      <td >
        {props.data.seatsAvailable}
      </td>
    </TR>
  );
}

const TR = styled.tr`
  &.green {
    color: #286741;
  }

  &.blue {
    color: #2B45AB;
  }

  &.red {
    color: #DB2B39;
  }
  td:not(:first-child) {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }
`

export default Entry;