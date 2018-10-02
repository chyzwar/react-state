import Listener from "./Listener";

abstract class Container<State extends Object = {}> {
  /**
   * Array or listeners, used by Subscribe
   */
  private listeners: Array<Listener<State>> = [];

  /**
   * Subscribe to state changes
   */
  public subscribe(listener: Listener<State>) {
    this.listeners
      .push(listener);
  }

  /**
   * Unsubscribe listener from state changes
   */
  public unsubscribe(listener: Listener<State>) {
    this.listeners = this.listeners
      .filter((l: Listener<State>) => l !== listener);
  }

  /**
   * State is property implemented on subsclass
   */
  protected abstract state: State;

  /**
   * Change state of container, optional callback
   */
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
