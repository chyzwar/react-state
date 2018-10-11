class Container {
    constructor() {
        /**
         * Array or listeners, used by Subscribe
         */
        this.listeners = [];
    }
    /**
     * Subscribe to state changes
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }
    /**
     * Unsubscribe listener from state changes
     */
    unsubscribe(listener) {
        this.listeners = this.listeners
            .filter((l) => l !== listener);
    }
    /**
     * Change state of container, optional callback
     */
    async setState(update, callback) {
        const current = this.state;
        this.state = {
            ...current,
            ...update,
        };
        const promises = this.listeners
            .map((listener) => listener(this.state));
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
