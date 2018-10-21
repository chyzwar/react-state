import Listener from "./Listener";

abstract class Container<State extends Object = {}> {
  /**
   * Array or listeners, used by Subscribe
   */
  private listeners: Listener[] = [];

  /**
   * Add listener for state changes
   */
  public subscribe(listener: Listener) {
    if (this.listeners.includes(listener) === false) {
      this.listeners.push(listener);
    }
  }

  /**
   * Unsubscribe listener from state changes
   */
  public unsubscribe(listener: Listener) {
    this.listeners = this.listeners
      .filter((l: Listener) => l !== listener);
  }

  /**
   * state is property required on subsclass
   */
  public abstract state: State;

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
      .map((listener: Listener) => listener());

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
