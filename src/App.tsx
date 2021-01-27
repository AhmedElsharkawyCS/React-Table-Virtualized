import React from "react";
import faker from "faker";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "./MUVirtualizedTable/VirtualizedTable";
import "./app.css";
const generateRandomItem = (idx: number) => ({
  id: idx + "-" + faker.random.word(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  companyName: faker.company.companyName(),
  date: faker.date.weekday(),
});

function App() {
  const [rows, setRows] = React.useState<Array<any>>(Array.from({ length: 50 }).map((_, index) => generateRandomItem(index)));
  const [fetch, setFetch] = React.useState<boolean>(false);
  const loadMoreRows = ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }): Promise<any> => {
    return new Promise((resolve: any) => {
      setFetch(true);
      setTimeout(() => {
        const newItems: Array<any> = [...rows];
        for (let idx = startIndex; idx < stopIndex; idx++) {
          newItems.push(generateRandomItem(idx));
        }
        setRows(newItems);
        setFetch(false);
        return resolve();
      }, 1000);
    });
  };
  const isRowLoaded = ({ index }: { index: number }) => {
    return !!rows[index];
  };
  return (
    <div className='App'>
      <div style={{ margin: 20 }}>
        <Table
          rowCount={rows.length}
          loadMoreRows={loadMoreRows}
          isRowLoaded={isRowLoaded}
          rowGetter={({ index }) => rows[index]}
          onRowClick={(row) => console.log(row)}
          expansionRowHeight={80}
          rowHeight={55}
          enableTableHeader={true}
          headerHeight={70}
          transition='all 500ms ease-in-out'
          lastSelectedIndex={1}
          columns={[
            {
              width: "20%",
              label: "ID",
              dataKey: "id",
              // numeric: true,
            },
            {
              width: "20%",
              label: "Name",
              dataKey: "name",
            },
            {
              width: "25%",
              label: "email",
              dataKey: "email",
            },
            {
              width: "20%",
              label: "Company Name",
              dataKey: "companyName",
            },
            {
              width: "15%",
              label: "Date",
              dataKey: "date",
            },
          ]}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={true}
        message={
          <ul>
            <li>
              Loaded rows: <code>{rows.length}</code>
            </li>
            <li>
              Fetching new data: <b>{String(fetch)}</b>
            </li>
            <li>
              Over scan row count: <code>20</code>
            </li>
            <li>
              Current dom elements/rows: <b>Over scan row count(20) + shown window rows</b>
            </li>
          </ul>
        }
      />
    </div>
  );
}

export default App;
