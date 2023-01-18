var ServerAction;
(function (ServerAction) {
    ServerAction[ServerAction["DONE"] = 0] = "DONE";
    ServerAction[ServerAction["UNDONE"] = 1] = "UNDONE";
    ServerAction[ServerAction["UPDATE"] = 2] = "UPDATE";
    ServerAction[ServerAction["CREATE"] = 3] = "CREATE";
    ServerAction[ServerAction["DELETE"] = 4] = "DELETE";
    ServerAction[ServerAction["UP"] = 5] = "UP";
    ServerAction[ServerAction["DOWN"] = 6] = "DOWN";
    ServerAction[ServerAction["RIGHT"] = 7] = "RIGHT";
    ServerAction[ServerAction["LEFT"] = 8] = "LEFT";
})(ServerAction || (ServerAction = {}));
export default ServerAction;
//# sourceMappingURL=ServerAction.js.map