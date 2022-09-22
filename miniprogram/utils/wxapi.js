"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.getSetting = void 0;
function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: resolve,
            fail: reject,
        });
    });
}
exports.getSetting = getSetting;
function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: resolve,
            fail: reject,
        });
    });
}
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3hhcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3eGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixVQUFVO0lBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBUEQsZ0NBT0M7QUFFRCxTQUFnQixXQUFXO0lBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBUEQsa0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZygpOiBQcm9taXNlPFdlY2hhdE1pbmlwcm9ncmFtLkdldFNldHRpbmdTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXHJcbiAgICAgIGZhaWw6IHJlamVjdCxcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbmZvKCk6IFByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uR2V0VXNlckluZm9TdWNjZXNzQ2FsbGJhY2tSZXN1bHQ+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICBzdWNjZXNzOiByZXNvbHZlLFxyXG4gICAgICBmYWlsOiByZWplY3QsXHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuIl19