"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wxapi_1 = require("./utils/wxapi");
let resolveUserInfo;
let rejectUserInfo;
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        }),
    },
    onLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            wx.request({
                url: "http://localhost:8080/trip/trip123",
                method: "GET",
                success: console.log,
                fail: console.error,
            });
            const logs = wx.getStorageSync('logs') || [];
            logs.unshift(Date.now());
            wx.setStorageSync('logs', logs);
            wx.login({
                success: res => {
                    console.log(res.code);
                },
            });
            try {
                const setting = yield (0, wxapi_1.getSetting)();
                if (setting.authSetting['scope.userInfo']) {
                    const userInfoRes = yield (0, wxapi_1.getUserInfo)();
                    resolveUserInfo(userInfoRes.userInfo);
                }
            }
            catch (err) {
                rejectUserInfo(err);
            }
        });
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXVEO0FBRXZELElBQUksZUFBc0csQ0FBQTtBQUMxRyxJQUFJLGNBQXNDLENBQUE7QUFHMUMsR0FBRyxDQUFhO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLGVBQWUsR0FBRyxPQUFPLENBQUE7WUFDekIsY0FBYyxHQUFHLE1BQU0sQ0FBQTtRQUN6QixDQUFDLENBQUM7S0FDSDtJQUVLLFFBQVE7O1lBQ1osRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ3BCLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUE7WUFFRixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ3hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRy9CLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUV2QixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBRUYsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsa0JBQVUsR0FBRSxDQUFBO2dCQUNsQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLG1CQUFXLEdBQUUsQ0FBQTtvQkFDdkMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDdEM7YUFDRjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNwQjtRQUNILENBQUM7S0FBQTtJQUNELGVBQWUsQ0FBQyxRQUFvQztRQUNsRCxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vYXBwLnRzXHJcbmltcG9ydCB7IElBcHBPcHRpb24gfSBmcm9tIFwiLi9hcHBvcHRpb25cIlxyXG5pbXBvcnQgeyBnZXRTZXR0aW5nLCBnZXRVc2VySW5mbyB9IGZyb20gXCIuL3V0aWxzL3d4YXBpXCJcclxuXHJcbmxldCByZXNvbHZlVXNlckluZm86ICh2YWx1ZTogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gfCBQcm9taXNlTGlrZTxXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbz4pID0+IHZvaWRcclxubGV0IHJlamVjdFVzZXJJbmZvOiAocmVhc29uPzogYW55KSA9PiB2b2lkXHJcblxyXG4vLyBhcHAudHNcclxuQXBwPElBcHBPcHRpb24+KHtcclxuICBnbG9iYWxEYXRhOiB7XHJcbiAgICB1c2VySW5mbzogbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXNvbHZlVXNlckluZm8gPSByZXNvbHZlXHJcbiAgICAgIHJlamVjdFVzZXJJbmZvID0gcmVqZWN0XHJcbiAgICB9KSxcclxuICB9LFxyXG5cclxuICBhc3luYyBvbkxhdW5jaCgpIHtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3RyaXAvdHJpcDEyM1wiLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIHN1Y2Nlc3M6IGNvbnNvbGUubG9nLFxyXG4gICAgICBmYWlsOiBjb25zb2xlLmVycm9yLFxyXG4gICAgfSlcclxuICAgIC8vIOWxleekuuacrOWcsOWtmOWCqOiDveWKm1xyXG4gICAgY29uc3QgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cclxuICAgIGxvZ3MudW5zaGlmdChEYXRlLm5vdygpKVxyXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKVxyXG5cclxuICAgIC8vIOeZu+W9lVxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5jb2RlKVxyXG4gICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgZ2V0U2V0dGluZygpXHJcbiAgICAgIGlmIChzZXR0aW5nLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XHJcbiAgICAgICAgY29uc3QgdXNlckluZm9SZXMgPSBhd2FpdCBnZXRVc2VySW5mbygpXHJcbiAgICAgICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvUmVzLnVzZXJJbmZvKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmVqZWN0VXNlckluZm8oZXJyKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbykge1xyXG4gICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKVxyXG4gIH1cclxufSkiXX0=