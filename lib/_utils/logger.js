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
//# sourceMappingURL=logger.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fdXRpbHMvbG9nZ2VyLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiTG9nZ2VyIiwiZXJyb3IiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsIm1zZyIsImluZm8iXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFQyxPQUFPLElBQVQsRUFBN0M7QUFDQUQsUUFBUUUsTUFBUixHQUFpQixLQUFLLENBQXRCO0FBQ0FGLFFBQVFFLE1BQVIsR0FBaUI7QUFDYkMsV0FBUUMsR0FBRCxJQUFTO0FBQ1pDLGdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUMsVUFBakMsRUFBNkNGLEdBQTdDO0FBQ0gsS0FIWTtBQUliRyxhQUFVQyxHQUFELElBQVM7QUFDZEgsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxZQUFqQyxFQUErQ0UsR0FBL0M7QUFDSCxLQU5ZO0FBT2JDLFVBQU9ELEdBQUQsSUFBUztBQUNYSCxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDLFNBQWpDLEVBQTRDRSxHQUE1QztBQUNIO0FBVFksQ0FBakI7QUFXQSIsImZpbGUiOiJsb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvZ2dlciA9IHZvaWQgMDtcclxuZXhwb3J0cy5Mb2dnZXIgPSB7XHJcbiAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFx4MWJbMzFtJXNcXHgxYlswbVwiLCBcIltFcnJvcl0gXCIsIGVycik7XHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogKG1zZykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFx4MWJbMzJtJXNcXHgxYlswbVwiLCBcIltTdWNjZXNzXSBcIiwgbXNnKTtcclxuICAgIH0sXHJcbiAgICBpbmZvOiAobXNnKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJcXHgxYlszM20lc1xceDFiWzBtXCIsIFwiW0luZm9dIFwiLCBtc2cpO1xyXG4gICAgfSxcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9nZ2VyLmpzLm1hcCJdfQ==