import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import faker from "faker";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as List } from "react-window";
import Row from "./Row";

const generateRandomItem = (idx: number) => ({
  id: idx,
  name: faker.name.findName(),
  email: faker.internet.email(),
});

export default function Table() {
  const [items, setItems] = React.useState<Array<any>>(Array.from({ length: 100 }).map((_, index) => generateRandomItem(index)));

  const loadMore = (startIndex: number, stopIndex: number) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        const newItems: Array<any> = [...items];
        for (let idx = startIndex; idx < stopIndex; idx++) {
          newItems.push(generateRandomItem(idx));
        }
        setItems(newItems);
        resolve();
      }, 10000);
    });
  };

  const isItemLoaded = (index: number) => {
    console.log("index", index);
    return index < items.length && items[index] !== null;
  };
  return (
    <div className='container' style={{ textAlign: "center" }}>
      <div style={{ border: "1rem solid", margin: 20 }}>
        <h1>React Table virtualized with infinite loader</h1>
        <h4>Total: {items.length}</h4>
      </div>
      <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMore} itemCount={1000000}>
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                className='List'
                outerTagName='table'
                innerTagName='tbody'
                onItemsRendered={onItemsRendered}
                ref={ref}
                // item={(pro) => console.log(pro)}
                height={400}
                itemCount={items.length}
                itemSize={30}
                style={{ display: "block", margin: 50 }}
                width={width - 80}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
}
