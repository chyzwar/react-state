import Listener from "./Listener";

abstract class Container<State extends Record<string, unknown> = {}> {
  /**
   * Set or listeners, used by Subscribe
   */
  private readonly listeners: Set<Listener> = new Set();

  /**
   * Add listener for state changes
   */
  public subscribe(listener: Listener): void {
    this.listeners.add(listener);
  }

  /**
   * Unsubscribe listener from state changes
   */
  public unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  }

  /**
   * State is property required on subsclass
   */
  public abstract state: State;

  /**
   * Change state of container, optional callback
   */
  public async setState(update: Partial<State>, callback?: () => void): Promise<void> {
    const current = this.state;

    this.state = {
      ...current,
      ...update,
    };

    const promises: Promise<void>[] = Array
      .from(this.listeners, (listener) => listener());

    if (callback) {
      return Promise
        .all(promises)
        .then(callback);
    }
  }
}

export default Container;
