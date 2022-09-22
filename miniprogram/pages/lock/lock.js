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
const routing_1 = require("../../utils/routing");
const shareLocationKey = "share_Location";
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        shareLocation: true,
        avatarURL: '',
    },
    onLoad(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = opt;
            console.log("unlocking car", o.car_id);
            let that = this;
            yield wx.getStorage({
                key: 'userInfo',
                success(res) {
                    that.setData({
                        userInfo: res.data,
                        hasUserInfo: true,
                        canIUseGetUserProfile: true
                    });
                },
                fail: function (err) {
                    that.setData({
                        canIUseGetUserProfile: true
                    });
                    console.log(err);
                },
            });
            yield wx.getStorage({
                key: shareLocationKey,
                success(res) {
                    that.setData({
                        shareLocation: res.data,
                    });
                },
                fail(err) {
                    console.log(err);
                }
            });
        });
    },
    getUserProfile() {
        wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (res) => {
                const userInfo = res.userInfo;
                console.log(res.userInfo);
                getApp().resolveUserInfo(userInfo);
                this.setData({
                    userInfo: userInfo,
                    hasUserInfo: true,
                    avatarURL: userInfo.avatarUrl,
                });
                wx.setStorageSync("userInfo", userInfo);
                let setNowTime = Date.now() + 3600 * 1000 * 24 * 30;
                wx.setStorageSync("userInfoStorageTime", setNowTime);
            },
            fail: function (err) {
                console.log(err);
            },
        });
    },
    onShareLocation(e) {
        const shareLocation = e.detail.value;
        console.log(shareLocation);
        wx.setStorageSync(shareLocationKey, shareLocation);
    },
    onUnlockTap() {
        wx.getLocation({
            type: "gjc02",
            success: loc => {
                console.log("starting a trip", {
                    location: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    },
                    avatarURL: this.data.shareLocation
                        ? this.data.avatarURL : '',
                });
                const tripID = "trip456";
                wx.showLoading({
                    title: "开锁中",
                    mask: true,
                });
                setTimeout(() => {
                    wx.redirectTo({
                        url: routing_1.routing.driving({
                            trip_id: tripID,
                        }),
                        complete: () => {
                            wx.hideLoading();
                        }
                    });
                }, 2000);
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权位置信息'
                });
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxpREFBOEM7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN6QyxJQUFJLENBQUM7SUFDSixJQUFJLEVBQUU7UUFDTCxRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLEVBQUU7S0FDYjtJQUNLLE1BQU0sQ0FBQyxHQUE2Qjs7WUFDekMsTUFBTSxDQUFDLEdBQXFCLEdBQUcsQ0FBQTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2YsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNuQixHQUFHLEVBQUUsVUFBVTtnQkFDZixPQUFPLENBQUMsR0FBRztvQkFDVixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNaLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSTt3QkFDbEIsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLHFCQUFxQixFQUFFLElBQUk7cUJBQzNCLENBQUMsQ0FBQTtnQkFDSCxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1oscUJBQXFCLEVBQUUsSUFBSTtxQkFDM0IsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7YUFDRCxDQUFDLENBQUE7WUFDRixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ25CLEdBQUcsRUFBRSxnQkFBZ0I7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHO29CQUNWLElBQUksQ0FBQyxPQUFPLENB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LENBQUE7WUFDSCxDQUFDO1NBQ0QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNELENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcm91dGluZ1wiO1xuXG5jb25zdCBzaGFyZUxvY2F0aW9uS2V5ID0gXCJzaGFyZV9Mb2NhdGlvblwiXG5QYWdlKHtcblx0ZGF0YToge1xuXHRcdHVzZXJJbmZvOiB7fSxcblx0XHRoYXNVc2VySW5mbzogZmFsc2UsXG5cdFx0Y2FuSVVzZUdldFVzZXJQcm9maWxlOiBmYWxzZSxcblx0XHRzaGFyZUxvY2F0aW9uOiB0cnVlLFxuXHRcdGF2YXRhclVSTDogJycsXG5cdH0sXG5cdGFzeW5jIG9uTG9hZChvcHQ6IFJlY29yZDxcImNhcl9pZFwiLCBzdHJpbmc+KSB7XG5cdFx0Y29uc3Qgbzogcm91dGluZy5Mb2NrT3B0cyA9IG9wdFxuXHRcdGNvbnNvbGUubG9nKFwidW5sb2NraW5nIGNhclwiLCBvLmNhcl9pZCk7XG5cdFx0bGV0IHRoYXQgPSB0aGlzXG5cdFx0YXdhaXQgd3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6ICd1c2VySW5mbycsXG5cdFx0XHRzdWNjZXNzKHJlcykge1xuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xuXHRcdFx0XHRcdHVzZXJJbmZvOiByZXMuZGF0YSxcblx0XHRcdFx0XHRoYXNVc2VySW5mbzogdHJ1ZSxcblx0XHRcdFx0XHRjYW5JVXNlR2V0VXNlclByb2ZpbGU6IHRydWVcblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0XHRcdHRoYXQuc2V0RGF0YSh7XG5cdFx0XHRcdFx0Y2FuSVVzZUdldFVzZXJQcm9maWxlOiB0cnVlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHR9LFxuXHRcdH0pXG5cdFx0YXdhaXQgd3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6IHNoYXJlTG9jYXRpb25LZXksXG5cdFx0XHRzdWNjZXNzKHJlcykge1xuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xuXHRcdFx0XHRcdHNoYXJlTG9jYXRpb246IHJlcy5kYXRhLFxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdGZhaWwoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblx0Ly8gb25HZXRVc2VySW5mbyhlOiBhbnkpIHtcblx0Ly8gXHRjb25zb2xlLmxvZyhlKVxuXHQvLyBcdGNvbnN0IHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG5cdC8vIFx0Z2V0QXBwPElBcHBPcHRpb24+KCkucmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKVxuXHQvLyB9LFxuXHRnZXRVc2VyUHJvZmlsZSgpIHtcblx0XHQvLyDmjqjojZDkvb/nlKggd3guZ2V0VXNlclByb2ZpbGUg6I635Y+W55So5oi35L+h5oGv77yM5byA5Y+R6ICF5q+P5qyh6YCa6L+H6K+l5o6l5Y+j6I635Y+W55So5oi35Liq5Lq65L+h5oGv5Z2H6ZyA55So5oi356Gu6K6kXG5cdFx0Ly8g5byA5Y+R6ICF5aal5ZaE5L+d566h55So5oi35b+r6YCf5aGr5YaZ55qE5aS05YOP5pi156ew77yM6YG/5YWN6YeN5aSN5by556qXXG5cdFx0d3guZ2V0VXNlclByb2ZpbGUoe1xuXHRcdFx0ZGVzYzogJ+eUqOS6juWujOWWhOeUqOaIt+i1hOaWmScsIC8vIOWjsOaYjuiOt+WPlueUqOaIt+S4quS6uuS/oeaBr+WQjueahOeUqOmAlO+8jOWQjue7reS8muWxleekuuWcqOW8ueeql+S4re+8jOivt+iwqOaFjuWhq+WGmVxuXHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xuXHRcdFx0XHRjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSByZXMudXNlckluZm9cblx0XHRcdFx0Y29uc29sZS5sb2cocmVzLnVzZXJJbmZvKTtcblx0XHRcdFx0Z2V0QXBwPElBcHBPcHRpb24+KCkucmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKTtcblx0XHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0XHR1c2VySW5mbzogdXNlckluZm8sXG5cdFx0XHRcdFx0aGFzVXNlckluZm86IHRydWUsXG5cdFx0XHRcdFx0YXZhdGFyVVJMOiB1c2VySW5mby5hdmF0YXJVcmwsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIsIHVzZXJJbmZvKTtcblxuXHRcdFx0XHRsZXQgc2V0Tm93VGltZSA9IERhdGUubm93KCkgKyAzNjAwICogMTAwMCAqIDI0ICogMzA7ICAvLyDorr7nva7kuoYzMOWkqeacieaViOacn1xuXHRcdFx0XHR3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvU3RvcmFnZVRpbWVcIiwgc2V0Tm93VGltZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmFpbDogZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fSxcblx0XHR9KVxuXHR9LFxuXHRvblNoYXJlTG9jYXRpb24oZTogYW55KSB7XG5cdFx0Y29uc3Qgc2hhcmVMb2NhdGlvbjogYm9vbGVhbiA9IGUuZGV0YWlsLnZhbHVlXG5cdFx0Y29uc29sZS5sb2coc2hhcmVMb2NhdGlvbik7XG5cdFx0d3guc2V0U3RvcmFnZVN5bmMoc2hhcmVMb2NhdGlvbktleSwgc2hhcmVMb2NhdGlvbik7XG5cdH0sXG5cdG9uVW5sb2NrVGFwKCkge1xuXHRcdHd4LmdldExvY2F0aW9uKHtcblx0XHRcdHR5cGU6IFwiZ2pjMDJcIixcblx0XHRcdHN1Y2Nlc3M6IGxvYyA9PiB7XG5cdFx0XHRcdC8vIHd4LnJlcXVlc3Qoe1xuXHRcdFx0XHQvLyBcdHVybDogXCJodHRwczovL2FwaS5jb29sY2FyLmNuXCIsXG5cdFx0XHRcdC8vIFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHQvLyBcdGRhdGE6IHtcblx0XHRcdFx0Ly8gXHRcdGxvY2F0aW9uOiB7XG5cdFx0XHRcdC8vIFx0XHRcdGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsXG5cdFx0XHRcdC8vIFx0XHRcdGxvbmdpdHVkZTogbG9jLmxvbmdpdHVkZSxcblx0XHRcdFx0Ly8gXHRcdH0sXG5cdFx0XHRcdC8vIFx0XHRhdmF0YXJVUkw6IHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uXG5cdFx0XHRcdC8vIFx0XHRcdD8gdGhpcy5kYXRhLmF2YXRhclVSTCA6ICcnLFxuXHRcdFx0XHQvLyBcdH0sXG5cdFx0XHRcdC8vIFx0aGVhZGVyOiB7XG5cdFx0XHRcdC8vIFx0XHRhdXRob3JpemF0aW9uOiBcImFzaGZhc2RramdoXCIsXG5cdFx0XHRcdC8vIFx0fSxcblx0XHRcdFx0Ly8gXHRtZXRob2Q6IFwiUE9TVFwiLFxuXHRcdFx0XHQvLyBcdHJlc3BvbnNlVHlwZTogXCJ0ZXh0XCIsXG5cdFx0XHRcdC8vIFx0c3VjY2VzcyhyZXMpIHtcblx0XHRcdFx0Ly8gXHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG5cdFx0XHRcdC8vIFx0XHRcdGNvbnN0IHRyaXBJRCA9IHJlcy5kYXRhLnRyaXBJZDtcblx0XHRcdFx0Ly8gXHRcdFx0d3guc2hvd0xvYWRpbmcoe1xuXHRcdFx0XHQvLyBcdFx0XHRcdHRpdGxlOiBcIuW8gOmUgeS4rVwiLFxuXHRcdFx0XHQvLyBcdFx0XHRcdG1hc2s6IHRydWUsXG5cdFx0XHRcdC8vIFx0XHRcdH0pXG5cdFx0XHRcdC8vIFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHQvLyBcdFx0XHRcdHd4LnJlZGlyZWN0VG8oe1xuXHRcdFx0XHQvLyBcdFx0XHRcdFx0Ly8gdXJsOiBgL3BhZ2VzL2RyaXZpbmcvZHJpdmluZz90cmlwX2lkPSR7dHJpcElEfWAsXG5cdFx0XHRcdC8vIFx0XHRcdFx0XHR1cmw6IHJvdXRpbmcuZHJpdmluZyh7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRcdHRyaXBfaWQ6IHRyaXBJRCxcblx0XHRcdFx0Ly8gXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQvLyBcdFx0XHRcdFx0Y29tcGxldGU6ICgpID0+IHtcblx0XHRcdFx0Ly8gXHRcdFx0XHRcdFx0d3guaGlkZUxvYWRpbmcoKVxuXHRcdFx0XHQvLyBcdFx0XHRcdFx0fVxuXHRcdFx0XHQvLyBcdFx0XHRcdH0pXG5cdFx0XHRcdC8vIFx0XHRcdH0sIDIwMDApO1xuXHRcdFx0XHQvLyBcdFx0fVxuXHRcdFx0XHQvLyBcdH1cblx0XHRcdFx0Ly8gfSlcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGEgdHJpcFwiLCB7XG5cdFx0XHRcdFx0bG9jYXRpb246IHtcblx0XHRcdFx0XHRcdGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsXG5cdFx0XHRcdFx0XHRsb25naXR1ZGU6IGxvYy5sb25naXR1ZGUsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhdmF0YXJVUkw6IHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uXG5cdFx0XHRcdFx0XHQ/IHRoaXMuZGF0YS5hdmF0YXJVUkwgOiAnJyxcblx0XHRcdFx0fSlcblxuXHRcdFx0XHRjb25zdCB0cmlwSUQgPSBcInRyaXA0NTZcIjtcblxuXHRcdFx0XHR3eC5zaG93TG9hZGluZyh7XG5cdFx0XHRcdFx0dGl0bGU6IFwi5byA6ZSB5LitXCIsXG5cdFx0XHRcdFx0bWFzazogdHJ1ZSxcblx0XHRcdFx0fSlcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0d3gucmVkaXJlY3RUbyh7XG5cdFx0XHRcdFx0XHQvLyB1cmw6IGAvcGFnZXMvZHJpdmluZy9kcml2aW5nP3RyaXBfaWQ9JHt0cmlwSUR9YCxcblx0XHRcdFx0XHRcdHVybDogcm91dGluZy5kcml2aW5nKHtcblx0XHRcdFx0XHRcdFx0dHJpcF9pZDogdHJpcElELFxuXHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRjb21wbGV0ZTogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR3eC5oaWRlTG9hZGluZygpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSwgMjAwMCk7XG5cdFx0XHR9LFxuXHRcdFx0ZmFpbDogKCkgPT4ge1xuXHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdGljb246ICdub25lJyxcblx0XHRcdFx0XHR0aXRsZTogJ+ivt+WJjeW+gOiuvue9rumhteaOiOadg+S9jee9ruS/oeaBrydcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KVxuXHR9LFxufSkiXX0=