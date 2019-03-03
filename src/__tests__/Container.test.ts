import Container from "../Container";

describe("Container", () => {
  type TestState = {
    test: number
  } 

  class TestContainer extends Container<TestState>{
    public state = { test: 0 };
  }

  it("should subscribe to state", () => {
    const container = new TestContainer();
    const listener = jest.fn();

    container.subscribe(listener);
    container.setState({test: 1});

    expect(listener).toHaveBeenCalled();
  });
})