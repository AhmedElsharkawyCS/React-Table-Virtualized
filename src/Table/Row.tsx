import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const Row = ({ index, style, items }: any) => {
  const loading = false;
  return (
    <tr style={style}>
      {loading ? (
        <Skeleton animation='wave' height={30} width='80%' />
      ) : (
        <>
          <td>First Table Cell, No.{index}</td>
          <td>Second Table Cell, No.{index}</td>
          <td>Third Table Cell, No.{index}</td>
        </>
      )}
    </tr>
  );
};

export default React.memo(Row);
