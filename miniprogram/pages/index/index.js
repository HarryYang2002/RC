"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_1 = require("../../utils/routing");
Page({
    isPageShowing: false,
    location: {
        latitude: 22.71991,
        longitude: 114.24779
    },
    data: {
        avatarURL: '',
        setting: {
            skew: 0,
            rotate: 0,
            showLocation: true,
            showScale: true,
            subKey: '',
            layerStyle: 1,
            enableZoom: true,
            enableScroll: true,
            enableRotate: false,
            showCompass: false,
            enable3D: false,
            enableOverlooking: false,
            enableSatellite: false,
            enableTraffic: false,
        },
        location: {
            latitude: 22.71991,
            longitude: 114.24779,
        },
        scale: 10,
        markers: [{
                iconPath: "/resources/car.png",
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 50,
                height: 50
            },
            {
                iconPath: "/resources/car.png",
                id: 1,
                latitude: 23.099994,
                longitude: 114.324520,
                width: 50,
                height: 50
            },
        ]
    },
    onLoad() {
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success(res) {
                that.setData({
                    avatarURL: res.data.avatarUrl,
                });
            },
            fail: function (err) {
                console.log(err);
            },
        });
    },
    onMyLocationTap() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                });
                console.log(this.data.location);
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权'
                });
            }
        });
    },
    onScanTap() {
        wx.scanCode({
            success: () => {
                wx.showModal({
                    title: "身份认证",
                    content: "需要身份认证才能租车",
                    success: (res) => {
                        if (res.confirm) {
                            console.log('用户点击确定');
                            const carID = "car123";
                            const redirectURL = routing_1.routing.lock({
                                car_id: carID,
                            });
                            wx.navigateTo({
                                url: routing_1.routing.register({
                                    redirectURL: redirectURL,
                                })
                            });
                        }
                        else if (res.cancel) {
                            console.log("用户点击取消");
                        }
                    },
                });
            },
            fail: console.error,
        });
    },
    onShow() {
        this.isPageShowing = true;
        let that = this;
        wx.getStorage({
            key: 'userInfo',
            success(res) {
                that.setData({
                    avatarURL: res.data.avatarUrl,
                });
            },
            fail: function (err) {
                console.log(err);
            },
        });
    },
    onHide() {
        this.isPageShowing = false;
    },
    onMyTripsTap() {
        wx.navigateTo({
            url: routing_1.routing.mytrips()
        });
    },
    moveCars() {
        const map = wx.createMapContext("map");
        const moveCar = () => {
            this.location.latitude += 0.1;
            this.location.longitude += 0.1;
            map.translateMarker({
                destination: {
                    latitude: this.location.latitude,
                    longitude: this.location.longitude,
                },
                markerId: 0,
                autoRotate: false,
                rotate: 0,
                duration: 5000,
                animationEnd: () => {
                    if (this.isPageShowing) {
                        moveCar();
                    }
                },
            });
        };
        moveCar();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE4QztBQUU5QyxJQUFJLENBQUM7SUFDSixhQUFhLEVBQUUsS0FBSztJQUNwQixRQUFRLEVBQUU7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsU0FBUztLQUNwQjtJQUNELElBQUksRUFBRTtRQUNMLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsQ0FBQztZQUNULFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEVBQUU7WUFDVixVQUFVLEVBQUUsQ0FBQztZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixlQUFlLEVBQUUsS0FBSztZQUN0QixhQUFhLEVBQUUsS0FBSztTQUNwQjtRQUNELFFBQVEsRUFBRTtZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxTQUFTO1NBQ3BCO1FBQ0QsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxFQUFFO2FBQ1Y7WUFDRDtnQkFDQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEtBQUssRUFBRSxF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QUM1QixDQUFDO0lBRUQsWUFBWTtRQUNYLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDYixHQUFHLEVBQUUsaUJBQU8sQ0FBQyxPQUFPLEVBQUU7U0FDdEIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDUCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7UUFNdEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUE7WUFDOUIsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDbkIsV0FBVyxFQUFFO29CQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7aUJBQ2xDO2dCQUNELFFBQVEsRUFBRSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxZQUFZLEVBQUUsR0FBRyxFQUFFO29CQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3ZCLE9BQU8sRUFBRSxDQUFBO3FCQUNUO2dCQUNGLENBQUM7YUFDRCxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNWLENBQUM7Q0FDRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdcIjtcclxuXHJcblBhZ2Uoe1xyXG5cdGlzUGFnZVNob3dpbmc6IGZhbHNlLFxyXG5cdGxvY2F0aW9uOiB7XHJcblx0XHRsYXRpdHVkZTogMjIuNzE5OTEsXHJcblx0XHRsb25naXR1ZGU6IDExNC4yNDc3OVxyXG5cdH0sXHJcblx0ZGF0YToge1xyXG5cdFx0YXZhdGFyVVJMOiAnJyxcclxuXHRcdHNldHRpbmc6IHtcclxuXHRcdFx0c2tldzogMCxcclxuXHRcdFx0cm90YXRlOiAwLFxyXG5cdFx0XHRzaG93TG9jYXRpb246IHRydWUsXHJcblx0XHRcdHNob3dTY2FsZTogdHJ1ZSxcclxuXHRcdFx0c3ViS2V5OiAnJyxcclxuXHRcdFx0bGF5ZXJTdHlsZTogMSxcclxuXHRcdFx0ZW5hYmxlWm9vbTogdHJ1ZSxcclxuXHRcdFx0ZW5hYmxlU2Nyb2xsOiB0cnVlLFxyXG5cdFx0XHRlbmFibGVSb3RhdGU6IGZhbHNlLFxyXG5cdFx0XHRzaG93Q29tcGFzczogZmFsc2UsXHJcblx0XHRcdGVuYWJsZTNEOiBmYWxzZSxcclxuXHRcdFx0ZW5hYmxlT3Zlcmxvb2tpbmc6IGZhbHNlLFxyXG5cdFx0XHRlbmFibGVTYXRlbGxpdGU6IGZhbHNlLFxyXG5cdFx0XHRlbmFibGVUcmFmZmljOiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHRsb2NhdGlvbjoge1xyXG5cdFx0XHRsYXRpdHVkZTogMjIuNzE5OTEsXHJcblx0XHRcdGxvbmdpdHVkZTogMTE0LjI0Nzc5LFxyXG5cdFx0fSxcclxuXHRcdHNjYWxlOiAxMCxcclxuXHRcdG1hcmtlcnM6IFt7XHJcblx0XHRcdGljb25QYXRoOiBcIi9yZXNvdXJjZXMvY2FyLnBuZ1wiLFxyXG5cdFx0XHRpZDogMCxcclxuXHRcdFx0bGF0aXR1ZGU6IDIzLjA5OTk5NCxcclxuXHRcdFx0bG9uZ2l0dWRlOiAxMTMuMzI0NTIwLFxyXG5cdFx0XHR3aWR0aDogNTAsXHJcblx0XHRcdGhlaWdodDogNTBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGljb25QYXRoOiBcIi9yZXNvdXJjZXMvY2FyLnBuZ1wiLFxyXG5cdFx0XHRpZDogMSxcclxuXHRcdFx0bGF0aXR1ZGU6IDIzLjA5OTk5NCxcclxuXHRcdFx0bG9uZ2l0dWRlOiAxMTQuMzI0NTIwLFxyXG5cdFx0XHR3aWR0aDogNTAsXHJcblx0XHRcdGhlaWdodDogNTBcclxuXHRcdH0sXHJcblx0XHRdXHJcblx0fSxcclxuXHJcblx0b25Mb2FkKCkge1xyXG5cdFx0bGV0IHRoYXQgPSB0aGlzXHJcblx0XHR3eC5nZXRTdG9yYWdlKHtcclxuXHRcdFx0a2V5OiAndXNlckluZm8nLFxyXG5cdFx0XHRzdWNjZXNzKHJlcykge1xyXG5cdFx0XHRcdHRoYXQuc2V0RGF0YSh7XHJcblx0XHRcdFx0XHRhdmF0YXJVUkw6IHJlcy5kYXRhLmF2YXRhclVybCxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0b25NeUxvY2F0aW9uVGFwKCkge1xyXG5cdFx0d3guZ2V0TG9jYXRpb24oe1xyXG5cdFx0XHR0eXBlOiAnZ2NqMDInLFxyXG5cdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xyXG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh7XHJcblx0XHRcdFx0XHRsb2NhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRsYXRpdHVkZTogcmVzLmxhdGl0dWRlLFxyXG5cdFx0XHRcdFx0XHRsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5kYXRhLmxvY2F0aW9uKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiAoKSA9PiB7XHJcblx0XHRcdFx0d3guc2hvd1RvYXN0KHtcclxuXHRcdFx0XHRcdGljb246ICdub25lJyxcclxuXHRcdFx0XHRcdHRpdGxlOiAn6K+35YmN5b6A6K6+572u6aG15o6I5p2DJ1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0b25TY2FuVGFwKCkge1xyXG5cdFx0d3guc2NhbkNvZGUoe1xyXG5cdFx0XHRzdWNjZXNzOiAoKSA9PiB7XHJcblx0XHRcdFx0d3guc2hvd01vZGFsKHtcclxuXHRcdFx0XHRcdHRpdGxlOiBcIui6q+S7veiupOivgVwiLFxyXG5cdFx0XHRcdFx0Y29udGVudDogXCLpnIDopoHouqvku73orqTor4HmiY3og73np5/ovaZcIixcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHJlcy5jb25maXJtKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgY2FySUQgPSBcImNhcjEyM1wiXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgcmVkaXJlY3RVUkwgPSByb3V0aW5nLmxvY2soe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FyX2lkOiBjYXJJRCxcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly91cmw6IGAvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXI/cmVkaXJlY3Q9JHtlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVUkwpfWBcclxuXHRcdFx0XHRcdFx0XHRcdHVybDogcm91dGluZy5yZWdpc3Rlcih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlZGlyZWN0VVJMOiByZWRpcmVjdFVSTCxcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCLnlKjmiLfngrnlh7vlj5bmtohcIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWlsOiBjb25zb2xlLmVycm9yLFxyXG5cdFx0fSlcclxuXHR9LFxyXG5cclxuXHJcblx0b25TaG93KCkge1xyXG5cdFx0dGhpcy5pc1BhZ2VTaG93aW5nID0gdHJ1ZTtcclxuXHRcdGxldCB0aGF0ID0gdGhpc1xyXG5cdFx0d3guZ2V0U3RvcmFnZSh7XHJcblx0XHRcdGtleTogJ3VzZXJJbmZvJyxcclxuXHRcdFx0c3VjY2VzcyhyZXMpIHtcclxuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xyXG5cdFx0XHRcdFx0YXZhdGFyVVJMOiByZXMuZGF0YS5hdmF0YXJVcmwsXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogZnVuY3Rpb24gKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdH0sXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0b25IaWRlKCkge1xyXG5cdFx0dGhpcy5pc1BhZ2VTaG93aW5nID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0b25NeVRyaXBzVGFwKCkge1xyXG5cdFx0d3gubmF2aWdhdGVUbyh7XHJcblx0XHRcdHVybDogcm91dGluZy5teXRyaXBzKClcclxuXHRcdH0pXHJcblx0fSxcclxuXHJcblx0bW92ZUNhcnMoKSB7XHJcblx0XHRjb25zdCBtYXAgPSB3eC5jcmVhdGVNYXBDb250ZXh0KFwibWFwXCIpXHJcblx0XHQvLyBjb25zdCBkZXN0ID0ge1xyXG5cdFx0Ly8gXHRsYXRpdHVkZTogMjMuMDk5OTk0LFxyXG5cdFx0Ly8gXHRsb25naXR1ZGU6IDExMy4zMjQ1MjBcclxuXHRcdC8vIH1cclxuXHJcblx0XHRjb25zdCBtb3ZlQ2FyID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmxvY2F0aW9uLmxhdGl0dWRlICs9IDAuMVxyXG5cdFx0XHR0aGlzLmxvY2F0aW9uLmxvbmdpdHVkZSArPSAwLjFcclxuXHRcdFx0bWFwLnRyYW5zbGF0ZU1hcmtlcih7XHJcblx0XHRcdFx0ZGVzdGluYXRpb246IHtcclxuXHRcdFx0XHRcdGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdGl0dWRlLFxyXG5cdFx0XHRcdFx0bG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uLmxvbmdpdHVkZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1hcmtlcklkOiAwLFxyXG5cdFx0XHRcdGF1dG9Sb3RhdGU6IGZhbHNlLFxyXG5cdFx0XHRcdHJvdGF0ZTogMCxcclxuXHRcdFx0XHRkdXJhdGlvbjogNTAwMCxcclxuXHRcdFx0XHRhbmltYXRpb25FbmQ6ICgpID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmlzUGFnZVNob3dpbmcpIHtcclxuXHRcdFx0XHRcdFx0bW92ZUNhcigpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdG1vdmVDYXIoKVxyXG5cdH1cclxufSkiXX0=