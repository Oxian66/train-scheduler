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
    <TR>
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
  & red {
    color: #DB2B39;
  }

  & green {
    color: #286741;
  }

  & blue {
    color: #286741;
  }
`

export default Entry;