"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
exports.Logger = {
    error: err => {
        console.log("\x1b[31m%s\x1b[0m", "[Error] ", err);
    },
    success: msg => {
        console.log("\x1b[32m%s\x1b[0m", "[Success] ", msg);
    },
    info: msg => {
        console.log("\x1b[33m%s\x1b[0m", "[Info] ", msg);
    }
};
//# sourceMappingURL=logger.helper.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fdXRpbHMvaGVscGVyL2xvZ2dlci5oZWxwZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJMb2dnZXIiLCJlcnJvciIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJzdWNjZXNzIiwibXNnIiwiaW5mbyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0FBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUVDLE9BQU8sSUFBVCxFQUE3QztBQUNBRCxRQUFRRSxNQUFSLEdBQWlCLEtBQUssQ0FBdEI7QUFDQUYsUUFBUUUsTUFBUixHQUFpQjtBQUNiQyxXQUFRQyxHQUFELElBQVM7QUFDWkMsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxVQUFqQyxFQUE2Q0YsR0FBN0M7QUFDSCxLQUhZO0FBSWJHLGFBQVVDLEdBQUQsSUFBUztBQUNkSCxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLFlBQWpDLEVBQStDRSxHQUEvQztBQUNILEtBTlk7QUFPYkMsVUFBT0QsR0FBRCxJQUFTO0FBQ1hILGdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUMsU0FBakMsRUFBNENFLEdBQTVDO0FBQ0g7QUFUWSxDQUFqQjtBQVdBIiwiZmlsZSI6ImxvZ2dlci5oZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dlciA9IHZvaWQgMDtcclxuZXhwb3J0cy5Mb2dnZXIgPSB7XHJcbiAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFx4MWJbMzFtJXNcXHgxYlswbVwiLCBcIltFcnJvcl0gXCIsIGVycik7XHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogKG1zZykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFx4MWJbMzJtJXNcXHgxYlswbVwiLCBcIltTdWNjZXNzXSBcIiwgbXNnKTtcclxuICAgIH0sXHJcbiAgICBpbmZvOiAobXNnKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJcXHgxYlszM20lc1xceDFiWzBtXCIsIFwiW0luZm9dIFwiLCBtc2cpO1xyXG4gICAgfSxcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9nZ2VyLmhlbHBlci5qcy5tYXAiXX0=