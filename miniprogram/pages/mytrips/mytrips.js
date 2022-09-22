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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0cmlwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15dHJpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxpREFBOEM7QUFtQzlDLElBQUksQ0FBQztJQUNKLFlBQVksRUFBRTtRQUNiLFNBQVMsRUFBRSxFQUEyQjtLQUN0QztJQUNELElBQUksRUFBRTtRQUNMLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLENBQUM7UUFDakIsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLENBQUM7UUFDVixjQUFjLEVBQUU7WUFDZjtnQkFDQyxHQUFHLEVBQUUseURBQXlEO2dCQUM5RCxXQUFXLEVBQUUsQ0FBQzthQUNkO1lBQ0Q7Z0JBQ0MsR0FBRyxFQUFFLHlEQUF5RDtnQkFDOUQsV0FBVyxFQUFFLENBQUM7YUFDZDtZQUNEO2dCQUNDLEdBQUcsRUFBRSx5REFBeUQ7Z0JBQzlELFdBQVcsRUFBRSxDQUFDO2FBQ2Q7WUFDRDtnQkFDQyxHQUFHLEVBQUUseURBQXlEO2dCQUM5RCxXQUFXLEVBQUUsQ0FBQzthQUNkO1NBQ0Q7UUFDRCxRQUFRLEVBQUUsRUFBRTtRQUNaLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsYUFBYSxFQUFFLElBQUk7UUFDbkIsU0FBUyxFQUFFLEVBQUU7UUFDYixXQUFXLEVBQUUsQ0FBQztRQUNkLFFBQVEsRUFBRSxDQUFDO1FBQ1gsU0FBUyxFQUFFLEVBQWdCO1FBQzNCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsUUFBUSxFQUFFLEVBQWU7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixTQUFTLEVBQUUsRUFBRTtLQUNiO0lBQ0QsY0FBYyxD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TUFBTSxHQUFHLEdBQVcsQ0FBQSxNQUFBLENBQUMsQ0FBQyxhQUFhLDBDQUFFLFNBQVMsS0FBRyxNQUFBLENBQUMsQ0FBQyxNQUFNLDBDQUFFLFNBQVMsQ0FBQSxDQUFBO1FBQ3BFLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUN0QixPQUFNO1NBQ047UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQy9DLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTTtTQUNOO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNaLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDN0IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVztTQUN0QyxDQUFDLENBQUE7SUFDSCxDQUFDO0NBQ0QsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCI7XG5cbmludGVyZmFjZSBUcmlwIHtcblx0aWQ6IHN0cmluZ1xuXHRzdGFydDogc3RyaW5nXG5cdGVuZDogc3RyaW5nXG5cdGR1cmF0aW9uOiBzdHJpbmdcblx0ZmVlOiBzdHJpbmdcblx0ZGlzdGFuY2U6IHN0cmluZ1xuXHRzdGF0dXM6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgTWFpbkl0ZW0ge1xuXHRpZDogc3RyaW5nXG5cdG5hdklkOiBzdHJpbmdcblx0bmF2U2Nyb2xsSWQ6IHN0cmluZ1xuXHRkYXRhOiBUcmlwXG59XG5cbmludGVyZmFjZSBOYXZJdGVtIHtcblx0aWQ6IHN0cmluZ1xuXHRtYWluSWQ6IHN0cmluZ1xuXHRsYWJlbDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBNYWluSXRlbVF1ZXJ5UmVzdWx0IHtcblx0aWQ6IHN0cmluZ1xuXHR0b3A6IG51bWJlclxuXHRkYXRhc2V0OiB7XG5cdFx0bmF2SWQ6IHN0cmluZ1xuXHRcdG5hdlNjcm9sbElkOiBzdHJpbmdcblx0fVxufVxuXG4vLyBwYWdlcy9teXRyaXBzL215dHJpcHMudHNcblBhZ2Uoe1xuXHRzY3JvbGxTdGF0ZXM6IHtcblx0XHRtYWluSXRlbXM6IFtdIGFzIE1haW5JdGVtUXVlcnlSZXN1bHRbXSxcblx0fSxcblx0ZGF0YToge1xuXHRcdGluZGljYXRvckRvdHM6IHRydWUsXG5cdFx0YXV0b1BsYXk6IGZhbHNlLFxuXHRcdGludGVydmFsOiAzMDAwLFxuXHRcdGR1cmF0aW9uOiA1MDAsXG5cdFx0Y2lyY3VsYXI6IHRydWUsXG5cdFx0bXVsdGlJdGVtQ291bnQ6IDEsXG5cdFx0cHJldk1hcmdpbjogXCJcIixcblx0XHRuZXh0TWFyZ2luOiBcIlwiLFxuXHRcdHZlcnRpY2FsOiBmYWxzZSxcblx0XHRjdXJyZW50OiAwLFxuXHRcdHByb21vdGlvbkl0ZW1zOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzMy5hbHBoYWNvZGVycy5jb20vMTAyL3RodW1iYmlnLTEwMjEzNS5qcGcnLFxuXHRcdFx0XHRwcm9tb3Rpb25JRDogMSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzMi5hbHBoYWNvZGVycy5jb20vMTAyL3RodW1iYmlnLTEwMjk3MC5qcGcnLFxuXHRcdFx0XHRwcm9tb3Rpb25JRDogMixcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzOC5hbHBoYWNvZGVycy5jb20vNDE4L3RodW1iYmlnLTQxODUxNS5qcGcnLFxuXHRcdFx0XHRwcm9tb3Rpb25JRDogMyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGltZzogJ2h0dHBzOi8vaW1hZ2VzOC5hbHBoYWNvZGVycy5jb20vNDQxL3RodW1iYmlnLTQ0MTgxOC5qcGcnLFxuXHRcdFx0XHRwcm9tb3Rpb25JRDogNCxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHR1c2VySW5mbzoge30sXG5cdFx0aGFzVXNlckluZm86IGZhbHNlLFxuXHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogZmFsc2UsXG5cdFx0c2hhcmVMb2NhdGlvbjogdHJ1ZSxcblx0XHRhdmF0YXJVUkw6ICcnLFxuXHRcdHRyaXBzSGVpZ2h0OiAwLFxuXHRcdG5hdkNvdW50OiAwLFxuXHRcdG1haW5JdGVtczogW10gYXMgTWFpbkl0ZW1bXSxcblx0XHRtYWluU2Nyb2xsOiAnJyxcblx0XHRuYXZJdGVtczogW10gYXMgTmF2SXRlbVtdLFxuXHRcdG5hdlNlbDogJycsXG5cdFx0bmF2U2Nyb2xsOiAnJyxcblx0fSxcblx0b25Td2lwZXJDaGFuZ2UoZTogYW55KSB7XG5cdFx0Y29uc29sZS5sb2coZSk7XG5cdH0sXG5cblx0Z2V0VXNlclByb2ZpbGUoKSB7XG5cdFx0Ly8g5o6o6I2Q5L2/55SoIHd4LmdldFVzZXJQcm9maWxlIOiOt+WPlueUqOaIt+S/oeaBr++8jOW8gOWPkeiAheavj+asoemAmui/h+ivpeaOpeWPo+iOt+WPlueUqOaIt+S4quS6uuS/oeaBr+Wdh+mcgOeUqOaIt+ehruiupFxuXHRcdC8vIOW8gOWPkeiAheWmpeWWhOS/neeuoeeUqOaIt+W/q+mAn+Whq+WGmeeahOWktOWDj+aYteensO+8jOmBv+WFjemHjeWkjeW8ueeql1xuXHRcdHd4LmdldFVzZXJQcm9maWxlKHtcblx0XHRcdGRlc2M6ICfnlKjkuo7lrozlloTnlKjmiLfotYTmlpknLCAvLyDlo7DmmI7ojrflj5bnlKjmiLfkuKrkurrkv6Hmga/lkI7nmoTnlKjpgJTvvIzlkI7nu63kvJrlsZXnpLrlnKjlvLnnqpfkuK3vvIzor7fosKjmhY7loavlhplcblx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcblx0XHRcdFx0Y29uc3QgdXNlckluZm86IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcy51c2VySW5mbyk7XG5cdFx0XHRcdGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbyk7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0dXNlckluZm86IHVzZXJJbmZvLFxuXHRcdFx0XHRcdGhhc1VzZXJJbmZvOiB0cnVlLFxuXHRcdFx0XHRcdGF2YXRhclVSTDogdXNlckluZm8uYXZhdGFyVXJsLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiLCB1c2VySW5mbyk7XG5cblx0XHRcdFx0bGV0IHNldE5vd1RpbWUgPSBEYXRlLm5vdygpICsgMzYwMCAqIDEwMDAgKiAyNCAqIDMwOyAgLy8g6K6+572u5LqGMzDlpKnmnInmlYjmnJ9cblx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1N0b3JhZ2VUaW1lXCIsIHNldE5vd1RpbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdH0sXG5cdFx0fSlcblx0fSxcblxuXHRvblJlZ2lzdGVyVGFwKCkge1xuXHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0dXJsOiByb3V0aW5nLnJlZ2lzdGVyKClcblx0XHR9KVxuXHR9LFxuXG5cdGFzeW5jIG9uTG9hZCgpIHtcblx0XHR0aGlzLnBvcHVsYXRlVHJpcHMoKVxuXHRcdGxldCB0aGF0ID0gdGhpc1xuXHRcdGF3YWl0IHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0a2V5OiAndXNlckluZm8nLFxuXHRcdFx0c3VjY2VzcyhyZXMpIHtcblx0XHRcdFx0dGhhdC5zZXREYXRhKHtcblx0XHRcdFx0XHR1c2VySW5mbzogcmVzLmRhdGEsXG5cdFx0XHRcdFx0aGFzVXNlckluZm86IHRydWUsXG5cdFx0XHRcdFx0Y2FuSVVzZUdldFVzZXJQcm9maWxlOiB0cnVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0ZmFpbDogZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xuXHRcdFx0XHRcdGNhbklVc2VHZXRVc2VyUHJvZmlsZTogdHJ1ZVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fSxcblx0XHR9KVxuXHR9LFxuXG5cdG9uUmVhZHkoKSB7XG5cdFx0d3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdChcIiNoZWFkaW5nXCIpLmJvdW5kaW5nQ2xpZW50UmVjdChyZWN0ID0+IHtcblx0XHRcdGNvbnN0IGhlaWdodCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93SGVpZ2h0IC0gcmVjdC5oZWlnaHRcblx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdHRyaXBzSGVpZ2h0OiBoZWlnaHQsXG5cdFx0XHRcdG5hdkNvdW50OiBNYXRoLnJvdW5kKGhlaWdodCAvIDUwKSxcblx0XHRcdH0pXG5cdFx0fSkuZXhlYygpXG5cdH0sXG5cblx0cG9wdWxhdGVUcmlwcygpIHtcblx0XHRjb25zdCBtYWluSXRlbXM6IE1haW5JdGVtW10gPSBbXVxuXHRcdGNvbnN0IG5hdkl0ZW1zOiBOYXZJdGVtW10gPSBbXVxuXHRcdGxldCBuYXZTZWwgPSAnJ1xuXHRcdGxldCBwcmV2TmF2ID0gJydcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG5cdFx0XHRjb25zdCBtYWluSWQgPSAnbWFpbi0nICsgaVxuXHRcdFx0Y29uc3QgbmF2SWQgPSAnbmF2LScgKyBpXG5cdFx0XHRjb25zdCB0cmlwSWQgPSAoMTAwMDEgKyBpKS50b1N0cmluZygpXG5cdFx0XHRpZiAoIXByZXZOYXYpIHtcblx0XHRcdFx0cHJldk5hdiA9IG5hdklkXG5cdFx0XHR9XG5cdFx0XHRtYWluSXRlbXMucHVzaCh7XG5cdFx0XHRcdGlkOiBtYWluSWQsXG5cdFx0XHRcdG5hdklkOiBuYXZJZCxcblx0XHRcdFx0bmF2U2Nyb2xsSWQ6IHByZXZOYXYsXG5cdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRpZDogdHJpcElkLFxuXHRcdFx0XHRcdHN0YXJ0OiAn5Lic5pa55piO54+gJyxcblx0XHRcdFx0XHRlbmQ6ICfov6rlo6vlsLwnLFxuXHRcdFx0XHRcdGRpc3RhbmNlOiAnMjcuMOWFrOmHjCcsXG5cdFx0XHRcdFx0ZHVyYXRpb246ICcw5pe2NDTliIYnLFxuXHRcdFx0XHRcdGZlZTogJzEyOC4wMOWFgycsXG5cdFx0XHRcdFx0c3RhdHVzOiAn5bey5a6M5oiQJyxcblx0XHRcdFx0fSxcblx0XHRcdH0pXG5cdFx0XHRuYXZJdGVtcy5wdXNoKHtcblx0XHRcdFx0aWQ6IG5hdklkLFxuXHRcdFx0XHRtYWluSWQ6IG1haW5JZCxcblx0XHRcdFx0bGFiZWw6IHRyaXBJZCxcblx0XHRcdH0pXG5cdFx0XHRpZiAoaSA9PT0gMCkge1xuXHRcdFx0XHRuYXZTZWwgPSBuYXZJZFxuXHRcdFx0fVxuXHRcdFx0cHJldk5hdiA9IG5hdklkXG5cdFx0fVxuXHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRtYWluSXRlbXMsXG5cdFx0XHRuYXZJdGVtcyxcblx0XHRcdG5hdlNlbCxcblx0XHR9LCAoKSA9PiB7XG5cdFx0XHR0aGlzLnByZXBhcmVTY3JvbGxTdGF0ZXMoKVxuXHRcdH0pXG5cdH0sXG5cblx0cHJlcGFyZVNjcm9sbFN0YXRlcygpIHtcblx0XHR3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0QWxsKCcubWFpbi1pdGVtJylcblx0XHRcdC5maWVsZHMoe1xuXHRcdFx0XHRpZDogdHJ1ZSxcblx0XHRcdFx0ZGF0YXNldDogdHJ1ZSxcblx0XHRcdFx0cmVjdDogdHJ1ZSxcblx0XHRcdH0pLmV4ZWMocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zY3JvbGxTdGF0ZXMubWFpbkl0ZW1zID0gcmVzWzBdXG5cdFx0XHR9KVxuXHR9LFxuXG5cdG9uUHJvbW90aW9uSXRlbVRhcChlOiBhbnkpIHtcblx0XHRjb25zdCBwcm9tb3Rpb25JRDogbnVtYmVyID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJvbW90aW9uSWRcblx0XHRpZiAocHJvbW90aW9uSUQpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdjbGFpbWluZyBwcm9tb3Rpb24nLCBwcm9tb3Rpb25JRClcblx0XHR9XG5cdH0sXG5cblx0b25HZXRVc2VySW5mbyhlOiBhbnkpIHtcblx0XHRjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuXHRcdGlmICh1c2VySW5mbykge1xuXHRcdFx0Z2V0QXBwPElBcHBPcHRpb24+KCkucmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvKVxuXHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0YXZhdGFyVVJMOiB1c2VySW5mby5hdmF0YXJVcmwsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSxcblxuXG5cdC8vIG9uTmF2SXRlbVRhcChlOiBhbnkpIHtcblx0Ly8gXHRjb25zdCBtYWluSWQ6IHN0cmluZyA9IGUuY3VycmVudFRhcmdldD8uZGF0YXNldD8ubWFpbklkXG5cdC8vIFx0aWYgKG1haW5JZCkge1xuXHQvLyBcdFx0dGhpcy5zZXREYXRhKHtcblx0Ly8gXHRcdFx0bWFpblNjcm9sbDogbWFpbklkLFxuXHQvLyBcdFx0fSlcblx0Ly8gXHR9XG5cdC8vIH0sXG5cblx0b25OYXZJdGVtVGFwKGU6IGFueSkge1xuXHRcdGNvbnN0IG1haW5JZDogc3RyaW5nID0gZS5jdXJyZW50VGFyZ2V0Py5kYXRhc2V0Py5tYWluSWRcblx0XHRjb25zdCBuYXZJZDogc3RyaW5nID0gZS5jdXJyZW50VGFyZ2V0Py5pZFxuXHRcdGlmIChtYWluSWQgJiYgbmF2SWQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdG1haW5TY3JvbGw6IG1haW5JZCxcblx0XHRcdFx0bmF2U2VsOiBuYXZJZCxcblx0XHRcdH0pXG5cdFx0fVxuXHR9LFxuXG5cdG9uTWFpblNjcm9sbChlOiBhbnkpIHtcblx0XHRjb25zdCB0b3A6IG51bWJlciA9IGUuY3VycmVudFRhcmdldD8ub2Zmc2V0VG9wICsgZS5kZXRhaWw/LnNjcm9sbFRvcFxuXHRcdGlmICh0b3AgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2VsSXRlbSA9IHRoaXMuc2Nyb2xsU3RhdGVzLm1haW5JdGVtcy5maW5kKFxuXHRcdFx0diA9PiB2LnRvcCA+PSB0b3ApXG5cdFx0aWYgKCFzZWxJdGVtKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0bmF2U2VsOiBzZWxJdGVtLmRhdGFzZXQubmF2SWQsXG5cdFx0XHRuYXZTY3JvbGw6IHNlbEl0ZW0uZGF0YXNldC5uYXZTY3JvbGxJZCxcblx0XHR9KVxuXHR9XG59KSJdfQ==