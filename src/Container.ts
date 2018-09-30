/* tslint:disable:no-object-literal-type-assertion */

import Listener from "./Listener";

class Container<State extends Object = {}> {
  private state!: State;
  private listeners: Array<Listener<State>> = [];

  public subscribe(listener: Listener<State>) {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: Listener<State>) {
    this.listeners = this.listeners.filter((f: Listener<State>) => f !== listener);
  }

  public async setState(update: Partial<State>, callback?: () => void): Promise<void> {
    const current = this.state;

    this.state = {
      ...(current as {}),
      ...(update as {}),
    } as State;

    const promises = this.listeners
      .map((listener: Listener<State>) => listener(this.state));

    return Promise
      .all(promises)
      .then(() => {
        if (callback) {
          return callback();
        }
      });
  }
}

export default Container;
