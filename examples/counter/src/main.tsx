import React from "react";
import ReactDOM from "react-dom";

import Provider from "@hyper/react-state/lib/Provider";
import Subscribe from "@hyper/react-state/lib/Subscribe";
import Container from "@hyper/react-state/lib/Container";

type CounterState = {
  count: number;
};

class CounterContainer extends Container<CounterState> {
  public state = { count: 0 };

  public increment() {
    this.setState({ count: this.state.count + 1 });
  }

  public decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

function Counter() {
  return (
    <Subscribe<[CounterContainer]> to={[CounterContainer]}>
      {(counter: CounterContainer) => (
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
