class Container {
    constructor() {
        /**
         * Array or listeners, used by Subscribe
         */
        this.listeners = [];
    }
    /**
     * Add listener for state changes
     */
    subscribe(listener) {
        if (this.listeners.includes(listener) === false) {
            this.listeners.push(listener);
        }
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
            .map((listener) => listener());
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
