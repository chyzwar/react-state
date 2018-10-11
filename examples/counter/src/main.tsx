import React from "react";
import ReactDOM from "react-dom";

import Provider from "@hyper/react-state/lib/Provider";
import Subscribe from "@hyper/react-state/lib/Subscribe";
import Container from "@hyper/react-state/lib/Container";

type CounterState = {
  count: number,
};

class CounterContainer extends Container<CounterState> {
  private state = { count: 0 };

  private increment() {
    this.setState({ count: this.state.count + 1 });
  }

  private decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

function Counter() {
  return (
    <Subscribe to={[CounterContainer]}>
      {(counter) => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

ReactDOM.render(
  <Provider>
    <Counter />
  </Provider>,
  document.getElementById("root"),
);
