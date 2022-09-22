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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE4QztBQUU5QyxJQUFJLENBQUM7SUFDSixhQUFhLEVBQUUsS0FBSztJQUNwQixRQUFRLEVBQUU7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixTQUFTLEVBQUUsU0FBUztLQUNwQjtJQUNELElBQUksRUFBRTtRQUNMLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsQ0FBQztZQUNULFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEVBQUU7WUFDVixVQUFVLEVBQUUsQ0FBQztZQUNiLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixlQUFlLEVBQUUsS0FBSztZQUN0QixhQUFhLEVBQUUsS0FBSztTQUNwQjtRQUNELFFBQVEsRUFBRTtZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxTQUFTO1NBQ3BCO1FBQ0QsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxFQUFFO2FBQ1Y7WUFDRDtnQkFDQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLEtBQUssRUFBRSxF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QUM1QixDQUFDO0lBRUQsWUFBWTtRQUNYLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDYixHQUFHLEVBQUUsaUJBQU8sQ0FBQyxPQUFPLEVBQUU7U0FDdEIsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDUCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7UUFNdEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUE7WUFDOUIsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDbkIsV0FBVyxFQUFFO29CQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7aUJBQ2xDO2dCQUNELFFBQVEsRUFBRSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsQ0FBQztnQkFDVCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxZQUFZLEVBQUUsR0FBRyxFQUFFO29CQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3ZCLE9BQU8sRUFBRSxDQUFBO3FCQUNUO2dCQUNGLENBQUM7YUFDRCxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUE7UUFDRCxPQUFPLEVBQUUsQ0FBQTtJQUNWLENBQUM7Q0FDRCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdcIjtcblxuUGFnZSh7XG5cdGlzUGFnZVNob3dpbmc6IGZhbHNlLFxuXHRsb2NhdGlvbjoge1xuXHRcdGxhdGl0dWRlOiAyMi43MTk5MSxcblx0XHRsb25naXR1ZGU6IDExNC4yNDc3OVxuXHR9LFxuXHRkYXRhOiB7XG5cdFx0YXZhdGFyVVJMOiAnJyxcblx0XHRzZXR0aW5nOiB7XG5cdFx0XHRza2V3OiAwLFxuXHRcdFx0cm90YXRlOiAwLFxuXHRcdFx0c2hvd0xvY2F0aW9uOiB0cnVlLFxuXHRcdFx0c2hvd1NjYWxlOiB0cnVlLFxuXHRcdFx0c3ViS2V5OiAnJyxcblx0XHRcdGxheWVyU3R5bGU6IDEsXG5cdFx0XHRlbmFibGVab29tOiB0cnVlLFxuXHRcdFx0ZW5hYmxlU2Nyb2xsOiB0cnVlLFxuXHRcdFx0ZW5hYmxlUm90YXRlOiBmYWxzZSxcblx0XHRcdHNob3dDb21wYXNzOiBmYWxzZSxcblx0XHRcdGVuYWJsZTNEOiBmYWxzZSxcblx0XHRcdGVuYWJsZU92ZXJsb29raW5nOiBmYWxzZSxcblx0XHRcdGVuYWJsZVNhdGVsbGl0ZTogZmFsc2UsXG5cdFx0XHRlbmFibGVUcmFmZmljOiBmYWxzZSxcblx0XHR9LFxuXHRcdGxvY2F0aW9uOiB7XG5cdFx0XHRsYXRpdHVkZTogMjIuNzE5OTEsXG5cdFx0XHRsb25naXR1ZGU6IDExNC4yNDc3OSxcblx0XHR9LFxuXHRcdHNjYWxlOiAxMCxcblx0XHRtYXJrZXJzOiBbe1xuXHRcdFx0aWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG5cdFx0XHRpZDogMCxcblx0XHRcdGxhdGl0dWRlOiAyMy4wOTk5OTQsXG5cdFx0XHRsb25naXR1ZGU6IDExMy4zMjQ1MjAsXG5cdFx0XHR3aWR0aDogNTAsXG5cdFx0XHRoZWlnaHQ6IDUwXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpY29uUGF0aDogXCIvcmVzb3VyY2VzL2Nhci5wbmdcIixcblx0XHRcdGlkOiAxLFxuXHRcdFx0bGF0aXR1ZGU6IDIzLjA5OTk5NCxcblx0XHRcdGxvbmdpdHVkZTogMTE0LjMyNDUyMCxcblx0XHRcdHdpZHRoOiA1MCxcblx0XHRcdGhlaWdodDogNTBcblx0XHR9LFxuXHRcdF1cblx0fSxcblxuXHRvbkxvYWQoKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzXG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6ICd1c2VySW5mbycsXG5cdFx0XHRzdWNjZXNzKHJlcykge1xuXHRcdFx0XHR0aGF0LnNldERhdGEoe1xuXHRcdFx0XHRcdGF2YXRhclVSTDogcmVzLmRhdGEuYXZhdGFyVXJsLFxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdH0sXG5cdFx0fSlcblx0fSxcblxuXHRvbk15TG9jYXRpb25UYXAoKSB7XG5cdFx0d3guZ2V0TG9jYXRpb24oe1xuXHRcdFx0dHlwZTogJ2djajAyJyxcblx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0bG9jYXRpb246IHtcblx0XHRcdFx0XHRcdGxhdGl0dWRlOiByZXMubGF0aXR1ZGUsXG5cdFx0XHRcdFx0XHRsb25naXR1ZGU6IHJlcy5sb25naXR1ZGUsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5kYXRhLmxvY2F0aW9uKVxuXHRcdFx0fSxcblx0XHRcdGZhaWw6ICgpID0+IHtcblx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRpY29uOiAnbm9uZScsXG5cdFx0XHRcdFx0dGl0bGU6ICfor7fliY3lvoDorr7nva7pobXmjojmnYMnXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblxuXHRvblNjYW5UYXAoKSB7XG5cdFx0d3guc2NhbkNvZGUoe1xuXHRcdFx0c3VjY2VzczogKCkgPT4ge1xuXHRcdFx0XHR3eC5zaG93TW9kYWwoe1xuXHRcdFx0XHRcdHRpdGxlOiBcIui6q+S7veiupOivgVwiLFxuXHRcdFx0XHRcdGNvbnRlbnQ6IFwi6ZyA6KaB6Lqr5Lu96K6k6K+B5omN6IO956ef6L2mXCIsXG5cdFx0XHRcdFx0c3VjY2VzczogKHJlcykgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHJlcy5jb25maXJtKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuXHRcdFx0XHRcdFx0XHRjb25zdCBjYXJJRCA9IFwiY2FyMTIzXCJcblx0XHRcdFx0XHRcdFx0Y29uc3QgcmVkaXJlY3RVUkwgPSByb3V0aW5nLmxvY2soe1xuXHRcdFx0XHRcdFx0XHRcdGNhcl9pZDogY2FySUQsXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0XHRcdFx0XHRcdC8vdXJsOiBgL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyP3JlZGlyZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VVJMKX1gXG5cdFx0XHRcdFx0XHRcdFx0dXJsOiByb3V0aW5nLnJlZ2lzdGVyKHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlZGlyZWN0VVJMOiByZWRpcmVjdFVSTCxcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi55So5oi354K55Ye75Y+W5raIXCIpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRmYWlsOiBjb25zb2xlLmVycm9yLFxuXHRcdH0pXG5cdH0sXG5cblxuXHRvblNob3coKSB7XG5cdFx0dGhpcy5pc1BhZ2VTaG93aW5nID0gdHJ1ZTtcblx0XHRsZXQgdGhhdCA9IHRoaXNcblx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdGtleTogJ3VzZXJJbmZvJyxcblx0XHRcdHN1Y2Nlc3MocmVzKSB7XG5cdFx0XHRcdHRoYXQuc2V0RGF0YSh7XG5cdFx0XHRcdFx0YXZhdGFyVVJMOiByZXMuZGF0YS5hdmF0YXJVcmwsXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0ZmFpbDogZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0fSxcblx0XHR9KVxuXHR9LFxuXHRvbkhpZGUoKSB7XG5cdFx0dGhpcy5pc1BhZ2VTaG93aW5nID0gZmFsc2U7XG5cdH0sXG5cblx0b25NeVRyaXBzVGFwKCkge1xuXHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0dXJsOiByb3V0aW5nLm15dHJpcHMoKVxuXHRcdH0pXG5cdH0sXG5cblx0bW92ZUNhcnMoKSB7XG5cdFx0Y29uc3QgbWFwID0gd3guY3JlYXRlTWFwQ29udGV4dChcIm1hcFwiKVxuXHRcdC8vIGNvbnN0IGRlc3QgPSB7XG5cdFx0Ly8gXHRsYXRpdHVkZTogMjMuMDk5OTk0LFxuXHRcdC8vIFx0bG9uZ2l0dWRlOiAxMTMuMzI0NTIwXG5cdFx0Ly8gfVxuXG5cdFx0Y29uc3QgbW92ZUNhciA9ICgpID0+IHtcblx0XHRcdHRoaXMubG9jYXRpb24ubGF0aXR1ZGUgKz0gMC4xXG5cdFx0XHR0aGlzLmxvY2F0aW9uLmxvbmdpdHVkZSArPSAwLjFcblx0XHRcdG1hcC50cmFuc2xhdGVNYXJrZXIoe1xuXHRcdFx0XHRkZXN0aW5hdGlvbjoge1xuXHRcdFx0XHRcdGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdGl0dWRlLFxuXHRcdFx0XHRcdGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb25naXR1ZGUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1hcmtlcklkOiAwLFxuXHRcdFx0XHRhdXRvUm90YXRlOiBmYWxzZSxcblx0XHRcdFx0cm90YXRlOiAwLFxuXHRcdFx0XHRkdXJhdGlvbjogNTAwMCxcblx0XHRcdFx0YW5pbWF0aW9uRW5kOiAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNQYWdlU2hvd2luZykge1xuXHRcdFx0XHRcdFx0bW92ZUNhcigpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSlcblx0XHR9XG5cdFx0bW92ZUNhcigpXG5cdH1cbn0pIl19