import Listener from "./Listener";
declare abstract class Container<State extends Object = {}> {
    /**
     * Array or listeners, used by Subscribe
     */
    private listeners;
    /**
     * Add listener for state changes
     */
    subscribe(listener: Listener): void;
    /**
     * Unsubscribe listener from state changes
     */
    unsubscribe(listener: Listener): void;
    /**
     * State is property required on subsclass
     */
    abstract state: State;
    /**
     * Change state of container, optional callback
     */
    setState(update: Partial<State>, callback?: () => void): Promise<void>;
}
export default Container;
//# sourceMappingURL=Container.d.ts.map