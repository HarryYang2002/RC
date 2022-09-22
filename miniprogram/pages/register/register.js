"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Page({
    redirectURL: '',
    data: {
        licImgURL: '',
        genders: ['未知', '男', '女', '其他'],
        genderIndex: 0,
        birthDate: '1970-01-01',
        licNo: '',
        name: '',
        state: 'UNSUBMITTED',
    },
    onUnloadLic() {
        wx.chooseMedia({
            success: res => {
                if (res.tempFiles.length > 0) {
                    this.setData({
                        licImgURL: res.tempFiles[0].tempFilePath
                    });
                    setTimeout(() => {
                        this.setData({
                            licNo: '13523463',
                            name: 'Harry',
                            genderIndex: 1,
                            birthDate: '2002-06-06'
                        });
                    }, 1000);
                }
            }
        });
    },
    onLoad(opt) {
        const o = opt;
        if (o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect);
        }
    },
    onGenderChange(e) {
        this.setData({
            genderIndex: e.detail.value,
        });
    },
    onBirthDateChange(e) {
        this.setData({
            birthDate: e.detail.value,
        });
    },
    onSubmit() {
        this.setData({
            state: 'PENDING',
        });
        setTimeout(() => {
            this.onLicVerified();
        }, 3000);
    },
    onResubmit() {
        this.setData({
            state: 'UNSUBMITTED',
            licImgURL: '',
        });
    },
    onLicVerified() {
        this.setData({
            state: 'VERIFIED',
        });
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQUksQ0FBQztJQUNKLFdBQVcsRUFBRSxFQUFFO0lBQ2YsSUFBSSxFQUFFO1FBQ0wsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDL0IsV0FBVyxFQUFFLENBQUM7UUFDZCxTQUFTLEVBQUUsWUFBWTtRQUN2QixLQUFLLEVBQUUsRUFBRTtRQUNULElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLGFBQXVEO0tBQzlEO0lBQ0QsV0FBVztRQUNWLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1osU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTtxQkFDeEMsQ0FBQyxDQUFBO29CQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWixLQUFLLEVBQUUsVUFBVTs0QkFDakIsSUFBSSxFQUFFLE9BQU87NEJBQ2IsV0FBVyxFQUFFLENBQUM7NEJBQ2QsU0FBUyxFQUFFLFlBQVk7eUJBQ3ZCLENBQUMsQ0FBQTtvQkFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7aUJBQ1I7WUFDRixDQUFDO1NBQ0QsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUE4QjtRQUNwQyxNQUFNLENBQUMsR0FBMEIsR0FBRyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ2pEO0lBQ0YsQ0FBQztJQUVELGNBQWMsQ0FBQyxDQUFNO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixXQUFXLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQzNCLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxDQUFNO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3pCLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNaLEtBQUssRUFBRSxTQUFTO1NBQ2hCLENBQUMsQ0FBQTtRQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDckIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1QsQ0FBQztJQUNELFVBQVU7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1osS0FBSyxFQUFFLGFBQWE7WUFDcEIsU0FBUyxFQUFFLEVBQUU7U0FDYixDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsYUFBYTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixLQUFLLEVBQUUsVUFBVTtTQUNqQixDQUFDLENBQUE7UUFDRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDckIsQ0FBQyxDQUFBO1NBQ0Y7SUFFRixDQUFDO0NBQ0QsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuUGFnZSh7XG5cdHJlZGlyZWN0VVJMOiAnJyxcblx0ZGF0YToge1xuXHRcdGxpY0ltZ1VSTDogJycsXG5cdFx0Z2VuZGVyczogWyfmnKrnn6UnLCAn55S3JywgJ+WlsycsICflhbbku5YnXSxcblx0XHRnZW5kZXJJbmRleDogMCxcblx0XHRiaXJ0aERhdGU6ICcxOTcwLTAxLTAxJyxcblx0XHRsaWNObzogJycsXG5cdFx0bmFtZTogJycsXG5cdFx0c3RhdGU6ICdVTlNVQk1JVFRFRCcgYXMgJ1VOU1VCTUlUVEVEJyB8ICdQRU5ESU5HJyB8ICdWRVJJRklFRCcsXG5cdH0sXG5cdG9uVW5sb2FkTGljKCkge1xuXHRcdHd4LmNob29zZU1lZGlhKHtcblx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdGlmIChyZXMudGVtcEZpbGVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0XHRcdFx0bGljSW1nVVJMOiByZXMudGVtcEZpbGVzWzBdLnRlbXBGaWxlUGF0aFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0XHRcdFx0XHRsaWNObzogJzEzNTIzNDYzJyxcblx0XHRcdFx0XHRcdFx0bmFtZTogJ0hhcnJ5Jyxcblx0XHRcdFx0XHRcdFx0Z2VuZGVySW5kZXg6IDEsXG5cdFx0XHRcdFx0XHRcdGJpcnRoRGF0ZTogJzIwMDItMDYtMDYnXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0sIDEwMDApXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHR9LFxuXG5cdG9uTG9hZChvcHQ6IFJlY29yZDxcInJlZGlyZWN0XCIsc3RyaW5nPikge1xuXHRcdGNvbnN0IG8gOiByb3V0aW5nLlJlZ2lzdGVyT3B0cyA9IG9wdFxuXHRcdGlmIChvLnJlZGlyZWN0KSB7XG5cdFx0XHR0aGlzLnJlZGlyZWN0VVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KG8ucmVkaXJlY3QpXG5cdFx0fVxuXHR9LFxuXG5cdG9uR2VuZGVyQ2hhbmdlKGU6IGFueSkge1xuXHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRnZW5kZXJJbmRleDogZS5kZXRhaWwudmFsdWUsXG5cdFx0fSlcblx0fSxcblx0b25CaXJ0aERhdGVDaGFuZ2UoZTogYW55KSB7XG5cdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdGJpcnRoRGF0ZTogZS5kZXRhaWwudmFsdWUsXG5cdFx0fSlcblx0fSxcblx0b25TdWJtaXQoKSB7XG5cdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdHN0YXRlOiAnUEVORElORycsXG5cdFx0fSlcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMub25MaWNWZXJpZmllZCgpXG5cdFx0fSwgMzAwMClcblx0fSxcblx0b25SZXN1Ym1pdCgpIHtcblx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0c3RhdGU6ICdVTlNVQk1JVFRFRCcsXG5cdFx0XHRsaWNJbWdVUkw6ICcnLFxuXHRcdH0pXG5cdH0sXG5cdG9uTGljVmVyaWZpZWQoKSB7XG5cdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdHN0YXRlOiAnVkVSSUZJRUQnLFxuXHRcdH0pXG5cdFx0aWYgKHRoaXMucmVkaXJlY3RVUkwpIHtcblx0XHRcdHd4LnJlZGlyZWN0VG8oe1xuXHRcdFx0XHR1cmw6IHRoaXMucmVkaXJlY3RVUkwsXG5cdFx0XHR9KVxuXHRcdH1cblxuXHR9XG59KSJdfQ==