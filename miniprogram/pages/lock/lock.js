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
        wx.getUserInfo;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpREFBOEM7QUFFOUMsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtBQUN6QyxJQUFJLENBQUM7SUFDSixJQUFJLEVBQUU7UUFDTCxRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLEVBQUU7S0FDYjtJQUNLLE1BQU0sQ0FBQyxHQUE2Qjs7WUFDekMsTUFBTSxDQUFDLEdBQXFCLEdBQUcsQ0FBQTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2YsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNuQixHQUFHLEVBQUUsVUFBVTtnQkFDZixPQUFPLENBQUMsR0FBRztvQkFDVixJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNaLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSTt3QkFDbEIsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLHFCQUFxQixFQUFFLElBQUk7cUJBQzNCLENBQUMsQ0FBQTtnQkFDSCxDQUFDO2dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1oscUJBQXFCLEVBQUUsSUFBSTtxQkFDM0IsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLENBQUM7YUFDRCxDQUFDLENBQUE7WUFDRixNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ25CLEdBQUcsRUFBRSxnQkFBZ0I7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHO29CQUNWLElBQUksQ0FBQyxPQUFPLENB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S0FBSyxFQUFFLGNBQWM7aUJBQ3JCLENBQUMsQ0FBQTtZQUNILENBQUM7U0FDRCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0QsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFwcE9wdGlvbiB9IGZyb20gXCIuLi8uLi9hcHBvcHRpb25cIjtcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCI7XHJcblxyXG5jb25zdCBzaGFyZUxvY2F0aW9uS2V5ID0gXCJzaGFyZV9Mb2NhdGlvblwiXHJcblBhZ2Uoe1xyXG5cdGRhdGE6IHtcclxuXHRcdHVzZXJJbmZvOiB7fSxcclxuXHRcdGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuXHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogZmFsc2UsXHJcblx0XHRzaGFyZUxvY2F0aW9uOiB0cnVlLFxyXG5cdFx0YXZhdGFyVVJMOiAnJyxcclxuXHR9LFxyXG5cdGFzeW5jIG9uTG9hZChvcHQ6IFJlY29yZDxcImNhcl9pZFwiLCBzdHJpbmc+KSB7XHJcblx0XHRjb25zdCBvOiByb3V0aW5nLkxvY2tPcHRzID0gb3B0XHJcblx0XHRjb25zb2xlLmxvZyhcInVubG9ja2luZyBjYXJcIiwgby5jYXJfaWQpO1xyXG5cdFx0bGV0IHRoYXQgPSB0aGlzXHJcblx0XHRhd2FpdCB3eC5nZXRTdG9yYWdlKHtcclxuXHRcdFx0a2V5OiAndXNlckluZm8nLFxyXG5cdFx0XHRzdWNjZXNzKHJlcykge1xyXG5cdFx0XHRcdHRoYXQuc2V0RGF0YSh7XHJcblx0XHRcdFx0XHR1c2VySW5mbzogcmVzLmRhdGEsXHJcblx0XHRcdFx0XHRoYXNVc2VySW5mbzogdHJ1ZSxcclxuXHRcdFx0XHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xyXG5cdFx0XHRcdFx0Y2FuSVVzZUdldFVzZXJQcm9maWxlOiB0cnVlXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHRcdGF3YWl0IHd4LmdldFN0b3JhZ2Uoe1xyXG5cdFx0XHRrZXk6IHNoYXJlTG9jYXRpb25LZXksXHJcblx0XHRcdHN1Y2Nlc3MocmVzKSB7XHJcblx0XHRcdFx0dGhhdC5zZXREYXRhKHtcclxuXHRcdFx0XHRcdHNoYXJlTG9jYXRpb246IHJlcy5kYXRhLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWwoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdC8vIG9uR2V0VXNlckluZm8oZTogYW55KSB7XHJcblx0Ly8gXHRjb25zb2xlLmxvZyhlKVxyXG5cdC8vIFx0Y29uc3QgdXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cclxuXHQvLyBcdGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcclxuXHQvLyB9LFxyXG5cdGdldFVzZXJQcm9maWxlKCkge1xyXG5cdFx0Ly8g5o6o6I2Q5L2/55SoIHd4LmdldFVzZXJQcm9maWxlIOiOt+WPlueUqOaIt+S/oeaBr++8jOW8gOWPkeiAheavj+asoemAmui/h+ivpeaOpeWPo+iOt+WPlueUqOaIt+S4quS6uuS/oeaBr+Wdh+mcgOeUqOaIt+ehruiupFxyXG4gICAgLy8g5byA5Y+R6ICF5aal5ZaE5L+d566h55So5oi35b+r6YCf5aGr5YaZ55qE5aS05YOP5pi156ew77yM6YG/5YWN6YeN5aSN5by556qXXHJcbiAgICB3eC5nZXRVc2VySW5mb1xyXG5cdFx0d3guZ2V0VXNlclByb2ZpbGUoe1xyXG5cdFx0XHRkZXNjOiAn55So5LqO5a6M5ZaE55So5oi36LWE5paZJywgLy8g5aOw5piO6I635Y+W55So5oi35Liq5Lq65L+h5oGv5ZCO55qE55So6YCU77yM5ZCO57ut5Lya5bGV56S65Zyo5by556qX5Lit77yM6K+36LCo5oWO5aGr5YaZXHJcblx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuXHRcdFx0XHRjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSByZXMudXNlckluZm9cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMudXNlckluZm8pO1xyXG5cdFx0XHRcdGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbyk7XHJcblx0XHRcdFx0dGhpcy5zZXREYXRhKHtcclxuXHRcdFx0XHRcdHVzZXJJbmZvOiB1c2VySW5mbyxcclxuXHRcdFx0XHRcdGhhc1VzZXJJbmZvOiB0cnVlLFxyXG5cdFx0XHRcdFx0YXZhdGFyVVJMOiB1c2VySW5mby5hdmF0YXJVcmwsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiLCB1c2VySW5mbyk7XHJcblxyXG5cdFx0XHRcdGxldCBzZXROb3dUaW1lID0gRGF0ZS5ub3coKSArIDM2MDAgKiAxMDAwICogMjQgKiAzMDsgIC8vIOiuvue9ruS6hjMw5aSp5pyJ5pWI5pyfXHJcblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1N0b3JhZ2VUaW1lXCIsIHNldE5vd1RpbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pXHJcblx0fSxcclxuXHRvblNoYXJlTG9jYXRpb24oZTogYW55KSB7XHJcblx0XHRjb25zdCBzaGFyZUxvY2F0aW9uOiBib29sZWFuID0gZS5kZXRhaWwudmFsdWVcclxuXHRcdGNvbnNvbGUubG9nKHNoYXJlTG9jYXRpb24pO1xyXG5cdFx0d3guc2V0U3RvcmFnZVN5bmMoc2hhcmVMb2NhdGlvbktleSwgc2hhcmVMb2NhdGlvbik7XHJcblx0fSxcclxuXHRvblVubG9ja1RhcCgpIHtcclxuXHRcdHd4LmdldExvY2F0aW9uKHtcclxuXHRcdFx0dHlwZTogXCJnamMwMlwiLFxyXG5cdFx0XHRzdWNjZXNzOiBsb2MgPT4ge1xyXG5cdFx0XHRcdC8vIHd4LnJlcXVlc3Qoe1xyXG5cdFx0XHRcdC8vIFx0dXJsOiBcImh0dHBzOi8vYXBpLmNvb2xjYXIuY25cIixcclxuXHRcdFx0XHQvLyBcdGRhdGFUeXBlOiBcImpzb25cIixcclxuXHRcdFx0XHQvLyBcdGRhdGE6IHtcclxuXHRcdFx0XHQvLyBcdFx0bG9jYXRpb246IHtcclxuXHRcdFx0XHQvLyBcdFx0XHRsYXRpdHVkZTogbG9jLmxhdGl0dWRlLFxyXG5cdFx0XHRcdC8vIFx0XHRcdGxvbmdpdHVkZTogbG9jLmxvbmdpdHVkZSxcclxuXHRcdFx0XHQvLyBcdFx0fSxcclxuXHRcdFx0XHQvLyBcdFx0YXZhdGFyVVJMOiB0aGlzLmRhdGEuc2hhcmVMb2NhdGlvblxyXG5cdFx0XHRcdC8vIFx0XHRcdD8gdGhpcy5kYXRhLmF2YXRhclVSTCA6ICcnLFxyXG5cdFx0XHRcdC8vIFx0fSxcclxuXHRcdFx0XHQvLyBcdGhlYWRlcjoge1xyXG5cdFx0XHRcdC8vIFx0XHRhdXRob3JpemF0aW9uOiBcImFzaGZhc2RramdoXCIsXHJcblx0XHRcdFx0Ly8gXHR9LFxyXG5cdFx0XHRcdC8vIFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0XHQvLyBcdHJlc3BvbnNlVHlwZTogXCJ0ZXh0XCIsXHJcblx0XHRcdFx0Ly8gXHRzdWNjZXNzKHJlcykge1xyXG5cdFx0XHRcdC8vIFx0XHRpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRcdC8vIFx0XHRcdGNvbnN0IHRyaXBJRCA9IHJlcy5kYXRhLnRyaXBJZDtcclxuXHRcdFx0XHQvLyBcdFx0XHR3eC5zaG93TG9hZGluZyh7XHJcblx0XHRcdFx0Ly8gXHRcdFx0XHR0aXRsZTogXCLlvIDplIHkuK1cIixcclxuXHRcdFx0XHQvLyBcdFx0XHRcdG1hc2s6IHRydWUsXHJcblx0XHRcdFx0Ly8gXHRcdFx0fSlcclxuXHRcdFx0XHQvLyBcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHQvLyBcdFx0XHRcdHd4LnJlZGlyZWN0VG8oe1xyXG5cdFx0XHRcdC8vIFx0XHRcdFx0XHQvLyB1cmw6IGAvcGFnZXMvZHJpdmluZy9kcml2aW5nP3RyaXBfaWQ9JHt0cmlwSUR9YCxcclxuXHRcdFx0XHQvLyBcdFx0XHRcdFx0dXJsOiByb3V0aW5nLmRyaXZpbmcoe1xyXG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRcdHRyaXBfaWQ6IHRyaXBJRCxcclxuXHRcdFx0XHQvLyBcdFx0XHRcdFx0fSksXHJcblx0XHRcdFx0Ly8gXHRcdFx0XHRcdGNvbXBsZXRlOiAoKSA9PiB7XHJcblx0XHRcdFx0Ly8gXHRcdFx0XHRcdFx0d3guaGlkZUxvYWRpbmcoKVxyXG5cdFx0XHRcdC8vIFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC8vIFx0XHRcdH0sIDIwMDApO1xyXG5cdFx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0Ly8gfSlcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJzdGFydGluZyBhIHRyaXBcIiwge1xyXG5cdFx0XHRcdFx0bG9jYXRpb246IHtcclxuXHRcdFx0XHRcdFx0bGF0aXR1ZGU6IGxvYy5sYXRpdHVkZSxcclxuXHRcdFx0XHRcdFx0bG9uZ2l0dWRlOiBsb2MubG9uZ2l0dWRlLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGF2YXRhclVSTDogdGhpcy5kYXRhLnNoYXJlTG9jYXRpb25cclxuXHRcdFx0XHRcdFx0PyB0aGlzLmRhdGEuYXZhdGFyVVJMIDogJycsXHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0Y29uc3QgdHJpcElEID0gXCJ0cmlwNDU2XCI7XHJcblxyXG5cdFx0XHRcdHd4LnNob3dMb2FkaW5nKHtcclxuXHRcdFx0XHRcdHRpdGxlOiBcIuW8gOmUgeS4rVwiLFxyXG5cdFx0XHRcdFx0bWFzazogdHJ1ZSxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0d3gucmVkaXJlY3RUbyh7XHJcblx0XHRcdFx0XHRcdC8vIHVybDogYC9wYWdlcy9kcml2aW5nL2RyaXZpbmc/dHJpcF9pZD0ke3RyaXBJRH1gLFxyXG5cdFx0XHRcdFx0XHR1cmw6IHJvdXRpbmcuZHJpdmluZyh7XHJcblx0XHRcdFx0XHRcdFx0dHJpcF9pZDogdHJpcElELFxyXG5cdFx0XHRcdFx0XHR9KSxcclxuXHRcdFx0XHRcdFx0Y29tcGxldGU6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHR3eC5oaWRlTG9hZGluZygpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSwgMjAwMCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWw6ICgpID0+IHtcclxuXHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xyXG5cdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxyXG5cdFx0XHRcdFx0dGl0bGU6ICfor7fliY3lvoDorr7nva7pobXmjojmnYPkvY3nva7kv6Hmga8nXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9LFxyXG59KSJdfQ==