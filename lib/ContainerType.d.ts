import Container from "./Container";
interface ContainerType<State extends object = {}> {
    new (...args: any[]): Container<State>;
}
export default ContainerType;
//# sourceMappingURL=ContainerType.d.ts.map