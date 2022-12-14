"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
var routing;
(function (routing) {
    function driving(o) {
        return `/pages/driving/driving?trip_id=${o.trip_id}`;
    }
    routing.driving = driving;
    function lock(o) {
        return `/pages/lock/lock?car_id=${o.car_id}`;
    }
    routing.lock = lock;
    function register(p) {
        const page = '/pages/register/register';
        if (!p) {
            return page;
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`;
    }
    routing.register = register;
    function mytrips() {
        return '/pages/mytrips/mytrips';
    }
    routing.mytrips = mytrips;
})(routing = exports.routing || (exports.routing = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBaUIsT0FBTyxDQW9DdkI7QUFwQ0QsV0FBaUIsT0FBTztJQUtwQixTQUFnQixPQUFPLENBQUMsQ0FBYztRQUNsQyxPQUFPLGtDQUFrQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDeEQsQ0FBQztJQUZlLGVBQU8sVUFFdEIsQ0FBQTtJQU1ELFNBQWdCLElBQUksQ0FBQyxDQUFXO1FBQzVCLE9BQU8sMkJBQTJCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBRmUsWUFBSSxPQUVuQixDQUFBO0lBVUQsU0FBZ0IsUUFBUSxDQUFDLENBQWtCO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLDBCQUEwQixDQUFBO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDSixPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxHQUFHLElBQUksYUFBYSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTtJQUNsRSxDQUFDO0lBTmUsZ0JBQVEsV0FNdkIsQ0FBQTtJQUVELFNBQWdCLE9BQU87UUFDbkIsT0FBTyx3QkFBd0IsQ0FBQTtJQUNuQyxDQUFDO0lBRmUsZUFBTyxVQUV0QixDQUFBO0FBQ0wsQ0FBQyxFQXBDZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBb0N2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBuYW1lc3BhY2Ugcm91dGluZyB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIERyaXZpbmdPcHRzIHtcclxuICAgICAgICB0cmlwX2lkOiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZHJpdmluZyhvOiBEcml2aW5nT3B0cykge1xyXG4gICAgICAgIHJldHVybiBgL3BhZ2VzL2RyaXZpbmcvZHJpdmluZz90cmlwX2lkPSR7by50cmlwX2lkfWBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIExvY2tPcHRzIHtcclxuICAgICAgICBjYXJfaWQ6IHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2NrKG86IExvY2tPcHRzKSB7XHJcbiAgICAgICAgcmV0dXJuIGAvcGFnZXMvbG9jay9sb2NrP2Nhcl9pZD0ke28uY2FyX2lkfWBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFJlZ2lzdGVyT3B0cyB7XHJcbiAgICAgICAgcmVkaXJlY3Q/OiBzdHJpbmdcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFJlZ2lzdGVyUGFyYW1zIHtcclxuICAgICAgICByZWRpcmVjdFVSTDogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHA/OiBSZWdpc3RlclBhcmFtcykge1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSAnL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyJ1xyXG4gICAgICAgIGlmICghcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFnZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7cGFnZX0/cmVkaXJlY3Q9JHtlbmNvZGVVUklDb21wb25lbnQocC5yZWRpcmVjdFVSTCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBteXRyaXBzKCkge1xyXG4gICAgICAgIHJldHVybiAnL3BhZ2VzL215dHJpcHMvbXl0cmlwcydcclxuICAgIH1cclxufVxyXG4iXX0=