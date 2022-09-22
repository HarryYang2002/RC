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
Page({
    scrollStates: {
        mainItems: [],
    },
    data: {
        indicatorDots: true,
        autoPlay: false,
        interval: 3000,
        duration: 500,
        circular: true,
        multiItemCount: 1,
        prevMargin: "",
        nextMargin: "",
        vertical: false,
        current: 0,
        promotionItems: [
            {
                img: 'https://images3.alphacoders.com/102/thumbbig-102135.jpg',
                promotionID: 1,
            },
            {
                img: 'https://images2.alphacoders.com/102/thumbbig-102970.jpg',
                promotionID: 2,
            },
            {
                img: 'https://images8.alphacoders.com/418/thumbbig-418515.jpg',
                promotionID: 3,
            },
            {
                img: 'https://images8.alphacoders.com/441/thumbbig-441818.jpg',
                promotionID: 4,
            },
        ],
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        shareLocation: true,
        avatarURL: '',
        tripsHeight: 0,
        navCount: 0,
        mainItems: [],
        mainScroll: '',
        navItems: [],
        navSel: '',
        navScroll: '',
    },
    onSwiperChange(e) {
        console.log(e);
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
    onRegisterTap() {
        wx.navigateTo({
            url: routing_1.routing.register()
        });
    },
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.populateTrips();
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
        });
    },
    onReady() {
        wx.createSelectorQuery().select("#heading").boundingClientRect(rect => {
            const height = wx.getSystemInfoSync().windowHeight - rect.height;
            this.setData({
                tripsHeight: height,
                navCount: Math.round(height / 50),
            });
        }).exec();
    },
    populateTrips() {
        const mainItems = [];
        const navItems = [];
        let navSel = '';
        let prevNav = '';
        for (let i = 0; i < 100; i++) {
            const mainId = 'main-' + i;
            const navId = 'nav-' + i;
            const tripId = (10001 + i).toString();
            if (!prevNav) {
                prevNav = navId;
            }
            mainItems.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: {
                    id: tripId,
                    start: '东方明珠',
                    end: '迪士尼',
                    distance: '27.0公里',
                    duration: '0时44分',
                    fee: '128.00元',
                    status: '已完成',
                },
            });
            navItems.push({
                id: navId,
                mainId: mainId,
                label: tripId,
            });
            if (i === 0) {
                navSel = navId;
            }
            prevNav = navId;
        }
        this.setData({
            mainItems,
            navItems,
            navSel,
        }, () => {
            this.prepareScrollStates();
        });
    },
    prepareScrollStates() {
        wx.createSelectorQuery().selectAll('.main-item')
            .fields({
            id: true,
            dataset: true,
            rect: true,
        }).exec(res => {
            this.scrollStates.mainItems = res[0];
        });
    },
    onPromotionItemTap(e) {
        const promotionID = e.currentTarget.dataset.promotionId;
        if (promotionID) {
            console.log('claiming promotion', promotionID);
        }
    },
    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo;
        if (userInfo) {
            getApp().resolveUserInfo(userInfo);
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        }
    },
    onNavItemTap(e) {
        var _a, _b, _c;
        const mainId = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.mainId;
        const navId = (_c = e.currentTarget) === null || _c === void 0 ? void 0 : _c.id;
        if (mainId && navId) {
            this.setData({
                mainScroll: mainId,
                navSel: navId,
            });
        }
    },
    onMainScroll(e) {
        var _a, _b;
        const top = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.offsetTop) + ((_b = e.detail) === null || _b === void 0 ? void 0 : _b.scrollTop);
        if (top === undefined) {
            return;
        }
        const selItem = this.scrollStates.mainItems.find(v => v.top >= top);
        if (!selItem) {
            return;
        }
        this.setData({
            navSel: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0cmlwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dHJpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpREFBOEM7QUFtQzlDLElBQUksQ0FBQztJQUNKLFlBQVksRUFBRTtRQUNiLFNBQVMsRUFBRSxFQUEyQjtLQUN0QztJQUNELElBQUksRUFBRTtRQUNMLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLENBQUM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLENBQUM7UUFDVixjQUFjLEVBQUU7WUFDZjtnQkFDQyxHQUFHLEVBQUUseURBQXlEO2dCQUM5RCxXQUFXLEVBQUUsQ0FBQzthQUNkO1lBQ0Q7Z0JBQ0MsR0FBRyxFQUFFLHlEQUF5RDtnQkFDOUQsV0FBVyxFQUFFLENBQUM7YUFDZDtZQUNEO2dCQUNDLEdBQUcsRUFBRSx5REFBeUQ7Z0JBQzlELFdBQVcsRUFBRSxDQUFDO2FBQ2Q7WUFDRDtnQkFDQyxHQUFHLEVBQUUseURBQXlEO2dCQUM5RCxXQUFXLEVBQUUsQ0FBQzthQUNkO1NBQ0Q7UUFDRCxRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsQ0FBQztRQUNkLFFBQVEsRUFBRSxDQUFDO1FBQ1gsU0FBUyxFQUFFLEVBQWdCO1FBQzNCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsUUFBUSxFQUFFLEVBQWU7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsRUFBRTtLQUNiO0lBQ0QsY0FBYyxD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RUQsWUFBWSxDQUFDLENBQU07O1FBQ2xCLE1BQU0sR0FBRyxHQUFXLENBQUEsTUFBQSxDQUFDLENBQUMsYUFBYSwwQ0FBRSxTQUFTLEtBQUcsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxTQUFTLENBQUEsQ0FBQTtRQUNwRSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTTtTQUNOO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUMvQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNiLE9BQU07U0FDTjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixNQUFNLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLO1lBQzdCLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVc7U0FDdEMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUNELENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElBcHBPcHRpb24gfSBmcm9tIFwiLi4vLi4vYXBwb3B0aW9uXCI7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcm91dGluZ1wiO1xyXG5cclxuaW50ZXJmYWNlIFRyaXAge1xyXG5cdGlkOiBzdHJpbmdcclxuXHRzdGFydDogc3RyaW5nXHJcblx0ZW5kOiBzdHJpbmdcclxuXHRkdXJhdGlvbjogc3RyaW5nXHJcblx0ZmVlOiBzdHJpbmdcclxuXHRkaXN0YW5jZTogc3RyaW5nXHJcblx0c3RhdHVzOiBzdHJpbmdcclxufVxyXG5cclxuaW50ZXJmYWNlIE1haW5JdGVtIHtcclxuXHRpZDogc3RyaW5nXHJcblx0bmF2SWQ6IHN0cmluZ1xyXG5cdG5hdlNjcm9sbElkOiBzdHJpbmdcclxuXHRkYXRhOiBUcmlwXHJcbn1cclxuXHJcbmludGVyZmFjZSBOYXZJdGVtIHtcclxuXHRpZDogc3RyaW5nXHJcblx0bWFpbklkOiBzdHJpbmdcclxuXHRsYWJlbDogc3RyaW5nXHJcbn1cclxuXHJcbmludGVyZmFjZSBNYWluSXRlbVF1ZXJ5UmVzdWx0IHtcclxuXHRpZDogc3RyaW5nXHJcblx0dG9wOiBudW1iZXJcclxuXHRkYXRhc2V0OiB7XHJcblx0XHRuYXZJZDogc3RyaW5nXHJcblx0XHRuYXZTY3JvbGxJZDogc3RyaW5nXHJcblx0fVxyXG59XHJcblxyXG4vLyBwYWdlcy9teXRyaXBzL215dHJpcHMudHNcclxuUGFnZSh7XHJcblx0c2Nyb2xsU3RhdGVzOiB7XHJcblx0XHRtYWluSXRlbXM6IFtdIGFzIE1haW5JdGVtUXVlcnlSZXN1bHRbXSxcclxuXHR9LFxyXG5cdGRhdGE6IHtcclxuXHRcdGluZGljYXRvckRvdHM6IHRydWUsXHJcblx0XHRhdXRvUGxheTogZmFsc2UsXHJcblx0XHRpbnRlcnZhbDogMzAwMCxcclxuXHRcdGR1cmF0aW9uOiA1MDAsXHJcblx0XHRjaXJjdWxhcjogdHJ1ZSxcclxuXHRcdG11bHRpSXRlbUNvdW50OiAxLFxyXG5cdFx0cHJldk1hcmdpbjogXCJcIixcclxuXHRcdG5leHRNYXJnaW46IFwiXCIsXHJcblx0XHR2ZXJ0aWNhbDogZmFsc2UsXHJcblx0XHRjdXJyZW50OiAwLFxyXG5cdFx0cHJvbW90aW9uSXRlbXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzMy5hbHBoYWNvZGVycy5jb20vMTAyL3RodW1iYmlnLTEwMjEzNS5qcGcnLFxyXG5cdFx0XHRcdHByb21vdGlvbklEOiAxLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aW1nOiAnaHR0cHM6Ly9pbWFnZXMyLmFscGhhY29kZXJzLmNvbS8xMDIvdGh1bWJiaWctMTAyOTcwLmpwZycsXHJcblx0XHRcdFx0cHJvbW90aW9uSUQ6IDIsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpbWc6ICdodHRwczovL2ltYWdlczguYWxwaGFjb2RlcnMuY29tLzQxOC90aHVtYmJpZy00MTg1MTUuanBnJyxcclxuXHRcdFx0XHRwcm9tb3Rpb25JRDogMyxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzOC5hbHBoYWNvZGVycy5jb20vNDQxL3RodW1iYmlnLTQ0MTgxOC5qcGcnLFxyXG5cdFx0XHRcdHByb21vdGlvbklEOiA0LFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHRcdHVzZXJJbmZvOiB7fSxcclxuXHRcdGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuXHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogZmFsc2UsXHJcblx0XHRzaGFyZUxvY2F0aW9uOiB0cnVlLFxyXG5cdFx0YXZhdGFyVVJMOiAnJyxcclxuXHRcdHRyaXBzSGVpZ2h0OiAwLFxyXG5cdFx0bmF2Q291bnQ6IDAsXHJcblx0XHRtYWluSXRlbXM6IFtdIGFzIE1haW5JdGVtW10sXHJcblx0XHRtYWluU2Nyb2xsOiAnJyxcclxuXHRcdG5hdkl0ZW1zOiBbXSBhcyBOYXZJdGVtW10sXHJcblx0XHRuYXZTZWw6ICcnLFxyXG5cdFx0bmF2U2Nyb2xsOiAnJyxcclxuXHR9LFxyXG5cdG9uU3dpcGVyQ2hhbmdlKGU6IGFueSkge1xyXG5cdFx0Y29uc29sZS5sb2coZSk7XHJcblx0fSxcclxuXHJcblx0Z2V0VXNlclByb2ZpbGUoKSB7XHJcblx0XHQvLyDmjqjojZDkvb/nlKggd3guZ2V0VXNlclByb2ZpbGUg6I635Y+W55So5oi35L+h5oGv77yM5byA5Y+R6ICF5q+P5qyh6YCa6L+H6K+l5o6l5Y+j6I635Y+W55So5oi35Liq5Lq65L+h5oGv5Z2H6ZyA55So5oi356Gu6K6kXHJcblx0XHQvLyDlvIDlj5HogIXlpqXlloTkv53nrqHnlKjmiLflv6vpgJ/loavlhpnnmoTlpLTlg4/mmLXnp7DvvIzpgb/lhY3ph43lpI3lvLnnqpdcclxuXHRcdHd4LmdldFVzZXJJbmZvXHJcblxyXG5cdFx0d3guZ2V0VXNlclByb2ZpbGUoe1xyXG5cdFx0XHRkZXNjOiAn55So5LqO5a6M5ZaE55So5oi36LWE5paZJywgLy8g5aOw5piO6I635Y+W55So5oi35Liq5Lq65L+h5oGv5ZCO55qE55So6YCU77yM5ZCO57ut5Lya5bGV56S65Zyo5by556qX5Lit77yM6K+36LCo5oWO5aGr5YaZXHJcblx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuXHRcdFx0XHRjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSByZXMudXNlckluZm9cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMudXNlckluZm8pO1xyXG5cdFx0XHRcdGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbyk7XHJcblx0XHRcdFx0dGhpcy5zZXREYXRhKHtcclxuXHRcdFx0XHRcdHVzZXJJbmZvOiB1c2VySW5mbyxcclxuXHRcdFx0XHRcdGhhc1VzZXJJbmZvOiB0cnVlLFxyXG5cdFx0XHRcdFx0YXZhdGFyVVJMOiB1c2VySW5mby5hdmF0YXJVcmwsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiLCB1c2VySW5mbyk7XHJcblxyXG5cdFx0XHRcdGxldCBzZXROb3dUaW1lID0gRGF0ZS5ub3coKSArIDM2MDAgKiAxMDAwICogMjQgKiAzMDsgIC8vIOiuvue9ruS6hjMw5aSp5pyJ5pWI5pyfXHJcblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1N0b3JhZ2VUaW1lXCIsIHNldE5vd1RpbWUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0b25SZWdpc3RlclRhcCgpIHtcclxuXHRcdHd4Lm5hdmlnYXRlVG8oe1xyXG5cdFx0XHR1cmw6IHJvdXRpbmcucmVnaXN0ZXIoKVxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRhc3luYyBvbkxvYWQoKSB7XHJcblx0XHR0aGlzLnBvcHVsYXRlVHJpcHMoKVxyXG5cdFx0bGV0IHRoYXQgPSB0aGlzXHJcblx0XHRhd2FpdCB3eC5nZXRTdG9yYWdlKHtcclxuXHRcdFx0a2V5OiAndXNlckluZm8nLFxyXG5cdFx0XHRzdWNjZXNzKHJlcykge1xyXG5cdFx0XHRcdHRoYXQuc2V0RGF0YSh7XHJcblx0XHRcdFx0XHR1c2VySW5mbzogcmVzLmRhdGEsXHJcblx0XHRcdFx0XHRoYXNVc2VySW5mbzogdHJ1ZSxcclxuXHRcdFx0XHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xyXG5cdFx0XHRcdFx0Y2FuSVVzZUdldFVzZXJQcm9maWxlOiB0cnVlXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHRvblJlYWR5KCkge1xyXG5cdFx0d3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdChcIiNoZWFkaW5nXCIpLmJvdW5kaW5nQ2xpZW50UmVjdChyZWN0ID0+IHtcclxuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dIZWlnaHQgLSByZWN0LmhlaWdodFxyXG5cdFx0XHR0aGlzLnNldERhdGEoe1xyXG5cdFx0XHRcdHRyaXBzSGVpZ2h0OiBoZWlnaHQsXHJcblx0XHRcdFx0bmF2Q291bnQ6IE1hdGgucm91bmQoaGVpZ2h0IC8gNTApLFxyXG5cdFx0XHR9KVxyXG5cdFx0fSkuZXhlYygpXHJcblx0fSxcclxuXHJcblx0cG9wdWxhdGVUcmlwcygpIHtcclxuXHRcdGNvbnN0IG1haW5JdGVtczogTWFpbkl0ZW1bXSA9IFtdXHJcblx0XHRjb25zdCBuYXZJdGVtczogTmF2SXRlbVtdID0gW11cclxuXHRcdGxldCBuYXZTZWwgPSAnJ1xyXG5cdFx0bGV0IHByZXZOYXYgPSAnJ1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG5cdFx0XHRjb25zdCBtYWluSWQgPSAnbWFpbi0nICsgaVxyXG5cdFx0XHRjb25zdCBuYXZJZCA9ICduYXYtJyArIGlcclxuXHRcdFx0Y29uc3QgdHJpcElkID0gKDEwMDAxICsgaSkudG9TdHJpbmcoKVxyXG5cdFx0XHRpZiAoIXByZXZOYXYpIHtcclxuXHRcdFx0XHRwcmV2TmF2ID0gbmF2SWRcclxuXHRcdFx0fVxyXG5cdFx0XHRtYWluSXRlbXMucHVzaCh7XHJcblx0XHRcdFx0aWQ6IG1haW5JZCxcclxuXHRcdFx0XHRuYXZJZDogbmF2SWQsXHJcblx0XHRcdFx0bmF2U2Nyb2xsSWQ6IHByZXZOYXYsXHJcblx0XHRcdFx0ZGF0YToge1xyXG5cdFx0XHRcdFx0aWQ6IHRyaXBJZCxcclxuXHRcdFx0XHRcdHN0YXJ0OiAn5Lic5pa55piO54+gJyxcclxuXHRcdFx0XHRcdGVuZDogJ+i/quWjq+WwvCcsXHJcblx0XHRcdFx0XHRkaXN0YW5jZTogJzI3LjDlhazph4wnLFxyXG5cdFx0XHRcdFx0ZHVyYXRpb246ICcw5pe2NDTliIYnLFxyXG5cdFx0XHRcdFx0ZmVlOiAnMTI4LjAw5YWDJyxcclxuXHRcdFx0XHRcdHN0YXR1czogJ+W3suWujOaIkCcsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSlcclxuXHRcdFx0bmF2SXRlbXMucHVzaCh7XHJcblx0XHRcdFx0aWQ6IG5hdklkLFxyXG5cdFx0XHRcdG1haW5JZDogbWFpbklkLFxyXG5cdFx0XHRcdGxhYmVsOiB0cmlwSWQsXHJcblx0XHRcdH0pXHJcblx0XHRcdGlmIChpID09PSAwKSB7XHJcblx0XHRcdFx0bmF2U2VsID0gbmF2SWRcclxuXHRcdFx0fVxyXG5cdFx0XHRwcmV2TmF2ID0gbmF2SWRcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0RGF0YSh7XHJcblx0XHRcdG1haW5JdGVtcyxcclxuXHRcdFx0bmF2SXRlbXMsXHJcblx0XHRcdG5hdlNlbCxcclxuXHRcdH0sICgpID0+IHtcclxuXHRcdFx0dGhpcy5wcmVwYXJlU2Nyb2xsU3RhdGVzKClcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0cHJlcGFyZVNjcm9sbFN0YXRlcygpIHtcclxuXHRcdHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKS5zZWxlY3RBbGwoJy5tYWluLWl0ZW0nKVxyXG5cdFx0XHQuZmllbGRzKHtcclxuXHRcdFx0XHRpZDogdHJ1ZSxcclxuXHRcdFx0XHRkYXRhc2V0OiB0cnVlLFxyXG5cdFx0XHRcdHJlY3Q6IHRydWUsXHJcblx0XHRcdH0pLmV4ZWMocmVzID0+IHtcclxuXHRcdFx0XHR0aGlzLnNjcm9sbFN0YXRlcy5tYWluSXRlbXMgPSByZXNbMF1cclxuXHRcdFx0fSlcclxuXHR9LFxyXG5cclxuXHRvblByb21vdGlvbkl0ZW1UYXAoZTogYW55KSB7XHJcblx0XHRjb25zdCBwcm9tb3Rpb25JRDogbnVtYmVyID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvbW90aW9uSWRcclxuXHRcdGlmIChwcm9tb3Rpb25JRCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnY2xhaW1pbmcgcHJvbW90aW9uJywgcHJvbW90aW9uSUQpXHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25HZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuXHRcdGNvbnN0IHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcblx0XHRpZiAodXNlckluZm8pIHtcclxuXHRcdFx0Z2V0QXBwPElBcHBPcHRpb24+KCkucmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKVxyXG5cdFx0XHR0aGlzLnNldERhdGEoe1xyXG5cdFx0XHRcdGF2YXRhclVSTDogdXNlckluZm8uYXZhdGFyVXJsLFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBvbk5hdkl0ZW1UYXAoZTogYW55KSB7XHJcblx0Ly8gXHRjb25zdCBtYWluSWQ6IHN0cmluZyA9IGUuY3VycmVudFRhcmdldD8uZGF0YXNldD8ubWFpbklkXHJcblx0Ly8gXHRpZiAobWFpbklkKSB7XHJcblx0Ly8gXHRcdHRoaXMuc2V0RGF0YSh7XHJcblx0Ly8gXHRcdFx0bWFpblNjcm9sbDogbWFpbklkLFxyXG5cdC8vIFx0XHR9KVxyXG5cdC8vIFx0fVxyXG5cdC8vIH0sXHJcblxyXG5cdG9uTmF2SXRlbVRhcChlOiBhbnkpIHtcclxuXHRcdGNvbnN0IG1haW5JZDogc3RyaW5nID0gZS5jdXJyZW50VGFyZ2V0Py5kYXRhc2V0Py5tYWluSWRcclxuXHRcdGNvbnN0IG5hdklkOiBzdHJpbmcgPSBlLmN1cnJlbnRUYXJnZXQ/LmlkXHJcblx0XHRpZiAobWFpbklkICYmIG5hdklkKSB7XHJcblx0XHRcdHRoaXMuc2V0RGF0YSh7XHJcblx0XHRcdFx0bWFpblNjcm9sbDogbWFpbklkLFxyXG5cdFx0XHRcdG5hdlNlbDogbmF2SWQsXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0b25NYWluU2Nyb2xsKGU6IGFueSkge1xyXG5cdFx0Y29uc3QgdG9wOiBudW1iZXIgPSBlLmN1cnJlbnRUYXJnZXQ/Lm9mZnNldFRvcCArIGUuZGV0YWlsPy5zY3JvbGxUb3BcclxuXHRcdGlmICh0b3AgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzZWxJdGVtID0gdGhpcy5zY3JvbGxTdGF0ZXMubWFpbkl0ZW1zLmZpbmQoXHJcblx0XHRcdHYgPT4gdi50b3AgPj0gdG9wKVxyXG5cdFx0aWYgKCFzZWxJdGVtKSB7XHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2V0RGF0YSh7XHJcblx0XHRcdG5hdlNlbDogc2VsSXRlbS5kYXRhc2V0Lm5hdklkLFxyXG5cdFx0XHRuYXZTY3JvbGw6IHNlbEl0ZW0uZGF0YXNldC5uYXZTY3JvbGxJZCxcclxuXHRcdH0pXHJcblx0fVxyXG59KSJdfQ==