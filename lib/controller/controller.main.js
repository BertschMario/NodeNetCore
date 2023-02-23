"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const main_1 = require("../main");
const _utils_1 = require("../_utils");
function Controller(method, path) {
    return function decorator(target) {
        const controller = new target();
        if (!controller.call) return _utils_1.Logger.error(`Controller "${target.name}" does not have an call method`);
        if (!target.name.endsWith("Controller")) return _utils_1.Logger.error(`Controller name "${target.name}" does not end with Controller`);
        if (controller.dispatch) {
            controller.dispatch = (...args) => {
                const serviceName = target.name.replace("Controller", "") + "Service";
                return main_1.services[serviceName].call(...args);
            };
        }
        main_1.controllers[target.name] = controller;
        setTimeout(() => {
            controller.call();
        }, 500);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.main.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIubWFpbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkNvbnRyb2xsZXIiLCJtYWluXzEiLCJyZXF1aXJlIiwiX3V0aWxzXzEiLCJtZXRob2QiLCJwYXRoIiwiZGVjb3JhdG9yIiwidGFyZ2V0IiwiY29udHJvbGxlciIsImNhbGwiLCJMb2dnZXIiLCJlcnJvciIsIm5hbWUiLCJlbmRzV2l0aCIsImRpc3BhdGNoIiwiYXJncyIsInNlcnZpY2VOYW1lIiwicmVwbGFjZSIsInNlcnZpY2VzIiwiY29udHJvbGxlcnMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkMsRUFBRUMsT0FBTyxJQUFULEVBQTdDO0FBQ0FELFFBQVFFLFVBQVIsR0FBcUIsS0FBSyxDQUExQjtBQUNBLE1BQU1DLFNBQVNDLFFBQVEsU0FBUixDQUFmO0FBQ0EsTUFBTUMsV0FBV0QsUUFBUSxXQUFSLENBQWpCO0FBQ0EsU0FBU0YsVUFBVCxDQUFvQkksTUFBcEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQzlCLFdBQU8sU0FBU0MsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDOUIsY0FBTUMsYUFBYSxJQUFJRCxNQUFKLEVBQW5CO0FBQ0EsWUFBSSxDQUFDQyxXQUFXQyxJQUFoQixFQUNJLE9BQU9OLFNBQVNPLE1BQVQsQ0FBZ0JDLEtBQWhCLENBQXVCLGVBQWNKLE9BQU9LLElBQUssZ0NBQWpELENBQVA7QUFDSixZQUFJLENBQUNMLE9BQU9LLElBQVAsQ0FBWUMsUUFBWixDQUFxQixZQUFyQixDQUFMLEVBQ0ksT0FBT1YsU0FBU08sTUFBVCxDQUFnQkMsS0FBaEIsQ0FBdUIsb0JBQW1CSixPQUFPSyxJQUFLLGdDQUF0RCxDQUFQO0FBQ0osWUFBSUosV0FBV00sUUFBZixFQUF5QjtBQUNyQk4sdUJBQVdNLFFBQVgsR0FBc0IsQ0FBQyxHQUFHQyxJQUFKLEtBQWE7QUFDL0Isc0JBQU1DLGNBQWNULE9BQU9LLElBQVAsQ0FBWUssT0FBWixDQUFvQixZQUFwQixFQUFrQyxFQUFsQyxJQUF3QyxTQUE1RDtBQUNBLHVCQUFPaEIsT0FBT2lCLFFBQVAsQ0FBZ0JGLFdBQWhCLEVBQTZCUCxJQUE3QixDQUFrQyxHQUFHTSxJQUFyQyxDQUFQO0FBQ0gsYUFIRDtBQUlIO0FBQ0RkLGVBQU9rQixXQUFQLENBQW1CWixPQUFPSyxJQUExQixJQUFrQ0osVUFBbEM7QUFDQVksbUJBQVcsTUFBTTtBQUNiWix1QkFBV0MsSUFBWDtBQUNILFNBRkQsRUFFRyxHQUZIO0FBR0gsS0FoQkQ7QUFpQkg7QUFDRFgsUUFBUUUsVUFBUixHQUFxQkEsVUFBckI7QUFDQSIsImZpbGUiOiJjb250cm9sbGVyLm1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNvbnRyb2xsZXIgPSB2b2lkIDA7XHJcbmNvbnN0IG1haW5fMSA9IHJlcXVpcmUoXCIuLi9tYWluXCIpO1xyXG5jb25zdCBfdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi9fdXRpbHNcIik7XHJcbmZ1bmN0aW9uIENvbnRyb2xsZXIobWV0aG9kLCBwYXRoKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgdGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKCFjb250cm9sbGVyLmNhbGwpXHJcbiAgICAgICAgICAgIHJldHVybiBfdXRpbHNfMS5Mb2dnZXIuZXJyb3IoYENvbnRyb2xsZXIgXCIke3RhcmdldC5uYW1lfVwiIGRvZXMgbm90IGhhdmUgYW4gY2FsbCBtZXRob2RgKTtcclxuICAgICAgICBpZiAoIXRhcmdldC5uYW1lLmVuZHNXaXRoKFwiQ29udHJvbGxlclwiKSlcclxuICAgICAgICAgICAgcmV0dXJuIF91dGlsc18xLkxvZ2dlci5lcnJvcihgQ29udHJvbGxlciBuYW1lIFwiJHt0YXJnZXQubmFtZX1cIiBkb2VzIG5vdCBlbmQgd2l0aCBDb250cm9sbGVyYCk7XHJcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIuZGlzcGF0Y2gpIHtcclxuICAgICAgICAgICAgY29udHJvbGxlci5kaXNwYXRjaCA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlTmFtZSA9IHRhcmdldC5uYW1lLnJlcGxhY2UoXCJDb250cm9sbGVyXCIsIFwiXCIpICsgXCJTZXJ2aWNlXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFpbl8xLnNlcnZpY2VzW3NlcnZpY2VOYW1lXS5jYWxsKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBtYWluXzEuY29udHJvbGxlcnNbdGFyZ2V0Lm5hbWVdID0gY29udHJvbGxlcjtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29udHJvbGxlci5jYWxsKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5Db250cm9sbGVyID0gQ29udHJvbGxlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udHJvbGxlci5tYWluLmpzLm1hcCJdfQ==