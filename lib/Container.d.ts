import Listener from "./Listener";
declare abstract class Container<State extends Object = {}> {
    /**
     * Array or listeners, used by Subscribe
     */
    private listeners;
    /**
     * Subscribe to state changes
     */
    subscribe(listener: Listener<State>): void;
    /**
     * Unsubscribe listener from state changes
     */
    unsubscribe(listener: Listener<State>): void;
    /**
     * state is property required on subsclass
     */
    protected abstract state: State;
    /**
     * Change state of container, optional callback
     */
    setState(update: Partial<State>, callback?: () => void): Promise<void>;
}
export default Container;
//# sourceMappingURL=Container.d.ts.map