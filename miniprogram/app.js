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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEseUNBQXVEO0FBRXZELElBQUksZUFBc0csQ0FBQTtBQUMxRyxJQUFJLGNBQXNDLENBQUE7QUFHMUMsR0FBRyxDQUFhO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsUUFBUSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLGVBQWUsR0FBRyxPQUFPLENBQUE7WUFDekIsY0FBYyxHQUFHLE1BQU0sQ0FBQTtRQUN6QixDQUFDLENBQUM7S0FDSDtJQUVLLFFBQVE7O1lBQ1osRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ25CLElBQUksRUFBQyxPQUFPLENBQUMsS0FBSzthQUNuQixDQUFDLENBQUE7WUFFRixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ3hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRy9CLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUV2QixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBRUYsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsa0JBQVUsR0FBRSxDQUFBO2dCQUNsQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLG1CQUFXLEdBQUUsQ0FBQTtvQkFDdkMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDdEM7YUFDRjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNwQjtRQUNILENBQUM7S0FBQTtJQUNELGVBQWUsQ0FBQyxRQUFvQztRQUNsRCxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vYXBwLnRzXG5pbXBvcnQgeyBJQXBwT3B0aW9uIH0gZnJvbSBcIi4vYXBwb3B0aW9uXCJcbmltcG9ydCB7IGdldFNldHRpbmcsIGdldFVzZXJJbmZvIH0gZnJvbSBcIi4vdXRpbHMvd3hhcGlcIlxuXG5sZXQgcmVzb2x2ZVVzZXJJbmZvOiAodmFsdWU6IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIHwgUHJvbWlzZUxpa2U8V2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8+KSA9PiB2b2lkXG5sZXQgcmVqZWN0VXNlckluZm86IChyZWFzb24/OiBhbnkpID0+IHZvaWRcblxuLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVVc2VySW5mbyA9IHJlc29sdmVcbiAgICAgIHJlamVjdFVzZXJJbmZvID0gcmVqZWN0XG4gICAgfSksXG4gIH0sXG5cbiAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3RyaXAvdHJpcDEyM1wiLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgc3VjY2Vzczpjb25zb2xlLmxvZyxcbiAgICAgIGZhaWw6Y29uc29sZS5lcnJvcixcbiAgICB9KVxuICAgIC8vIOWxleekuuacrOWcsOWtmOWCqOiDveWKm1xuICAgIGNvbnN0IGxvZ3MgPSB3eC5nZXRTdG9yYWdlU3luYygnbG9ncycpIHx8IFtdXG4gICAgbG9ncy51bnNoaWZ0KERhdGUubm93KCkpXG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ3MnLCBsb2dzKVxuXG4gICAgLy8g55m75b2VXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICB9LFxuICAgIH0pXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNldHRpbmcgPSBhd2FpdCBnZXRTZXR0aW5nKClcbiAgICAgIGlmIChzZXR0aW5nLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgIGNvbnN0IHVzZXJJbmZvUmVzID0gYXdhaXQgZ2V0VXNlckluZm8oKVxuICAgICAgICByZXNvbHZlVXNlckluZm8odXNlckluZm9SZXMudXNlckluZm8pXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZWplY3RVc2VySW5mbyhlcnIpXG4gICAgfVxuICB9LFxuICByZXNvbHZlVXNlckluZm8odXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvKSB7XG4gICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKVxuICB9XG59KSJdfQ==